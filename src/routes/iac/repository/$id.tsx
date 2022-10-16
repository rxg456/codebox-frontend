import { Button, Card, Descriptions, PageHeader, Space } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { iacRepositoryApi } from "~/api";
import { useAsync } from "~/hooks";
import { getNumberParam } from "~/utils";
import { IacMissionHistories } from "~/views/iac/mission/histories";
import { IacMissionSubmit } from "~/views/iac/mission/submit";

export default () => {
    const params = useParams();
    const navigate = useNavigate();
    const get = useAsync(iacRepositoryApi.getRepository.bind(iacRepositoryApi));
    const [openIacMissionSubmitModal] = IacMissionSubmit.useIacMissionSubmit();

    useEffect(() => {
        const id = getNumberParam(params, "id");
        if (id) {
            get.run({ id });
        }
    }, [params.id]);

    const extra = (
        <Space>
            <Button type={"primary"}>
                <Link to={"edit"}>更新</Link>
            </Button>
            <Button type={"primary"} onClick={openIacMissionSubmitModal} danger>
                执行
            </Button>
        </Space>
    );

    return (
        <>
            <IacMissionSubmit repository={get.data?.id} />
            <PageHeader title={get.data?.name} ghost={false} extra={extra} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 16 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"名称"}>{get.data?.name}</Descriptions.Item>
                    <Descriptions.Item label={"地址"}>{get.data?.url}</Descriptions.Item>
                    <Descriptions.Item label={"说明"} span={2}>
                        {get.data?.remark}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ marginTop: 16 }} title="执行历史">
                <IacMissionHistories repository={get.data?.id} />
            </Card>
        </>
    );
};
