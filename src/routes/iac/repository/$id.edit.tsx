import { Button, Card, Form, Input, message, PageHeader, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { iacRepositoryApi } from "~/api";
import { RepositoryMutation } from "~/generated";
import { useAsync } from "~/hooks";
import { getNumberParam } from "~/utils";

export default () => {
    const params = useParams();
    const navigate = useNavigate();
    const get = useAsync(iacRepositoryApi.getRepository.bind(iacRepositoryApi));
    const update = useAsync(iacRepositoryApi.updateRepository.bind(iacRepositoryApi));
    const [form] = Form.useForm<RepositoryMutation>();

    useEffect(() => {
        const id = getNumberParam(params, "id");
        if (id) {
            get.run({ id });
        }
    }, [params.id]);

    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            form.setFieldsValue(get.data);
        }
    }, [get.state]);

    useEffect(() => {
        if (update.state === "COMPLETED" && update.data?.id) {
            message.success("更新成功");
            navigate(`../${update.data?.id}`);
        }
    }, [update.state]);

    const submit = (values: RepositoryMutation) => {
        if (get.data?.id) {
            update.run({ repositoryMutation: values, id: get.data.id });
        }
    };
    return (
        <>
            <PageHeader title="修改仓库定义" subTitle={get.data?.name} ghost={false} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 16 }}>
                <Spin spinning={get.loading || update.loading}>
                    <Form onFinish={submit} form={form} labelCol={{ span: 2 }}>
                        <Form.Item label="名称" name={"name"} rules={[{ required: true }]} required>
                            <Input />
                        </Form.Item>
                        <Form.Item label={"地址"} name={"url"} rules={[{ required: true }]} required>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={"说明"} name={"remark"}>
                            <Input.TextArea autoSize={{ minRows: 2 }}></Input.TextArea>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2 }}>
                            <Button type="primary" htmlType="submit">
                                更新
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </>
    );
};
