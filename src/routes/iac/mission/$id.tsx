import AnsiUp from "ansi_up";
import { Card, Descriptions, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { iacMissionApi } from "~/api";
import { useAsync } from "~/hooks";
import { dateFormat, getNumberParam } from "~/utils";
import { IacMissionState } from "~/views/iac/mission/state";

export default () => {
    const params = useParams();
    const get = useAsync(iacMissionApi.getMission.bind(iacMissionApi));
    const navigate = useNavigate();
    const ansi = new AnsiUp();

    useEffect(() => {
        const id = getNumberParam(params, "id");
        if (id) {
            get.run({ id });
        }
    }, [params.id]);
    return (
        <>
            <PageHeader title={"任务详情"} ghost={false} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 16 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"playbook"}>{get.data?.playbook}</Descriptions.Item>
                    <Descriptions.Item label={"状态"}>
                        <IacMissionState state={get.data?.state ?? -1} />
                    </Descriptions.Item>
                    <Descriptions.Item label={"仓库"}>
                        <Link to={`/iac/repository/${get.data?.repository.id}`}>{get.data?.repository.name}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label={"commit"}>{get.data?.commit}</Descriptions.Item>
                    <Descriptions.Item label={"提交时间"}>{dateFormat(get.data?.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label={"完成时间"}>{dateFormat(get.data?.updatedAt)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ marginTop: 16 }} title={"输出"}>
                <pre dangerouslySetInnerHTML={{ __html: ansi.ansi_to_html(get.data?.output ?? "") }}></pre>
            </Card>
        </>
    );
};
