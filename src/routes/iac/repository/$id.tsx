import { Card, Descriptions, PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { iacRepositoryApi } from "~/api";
import { useAsync } from "~/hooks";
import { getNumberParam } from "~/utils";

export default () => {
    const params = useParams();
    const navigate = useNavigate();
    const get = useAsync(iacRepositoryApi.getRepository.bind(iacRepositoryApi));

    useEffect(() => {
        const id = getNumberParam(params, "id");
        if (id) {
            get.run({ id });
        }
    }, [params.id]);

    return (
        <>
            <PageHeader title={get.data?.name} ghost={false} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 16 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"名称"}>{get.data?.name}</Descriptions.Item>
                    <Descriptions.Item label={"地址"}>{get.data?.url}</Descriptions.Item>
                    <Descriptions.Item label={"说明"} span={2}>
                        {get.data?.remark}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};
