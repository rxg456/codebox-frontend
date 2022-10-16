import { Button, Card, Form, Input, message, PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { iacRepositoryApi } from "~/api";
import { RepositoryCreation } from "~/generated";
import { useAsync } from "~/hooks";

export default () => {
    const create = useAsync(iacRepositoryApi.createRepository.bind(iacRepositoryApi));
    const [form] = Form.useForm<RepositoryCreation>();
    const navigate = useNavigate();
    const submit = (values: RepositoryCreation) => {
        create.run({ repositoryCreation: values });
    };

    useEffect(() => {
        if (create.state === "COMPLETED" && create.data?.id) {
            message.success("创建成功");
            navigate(`../${create.data?.id}`);
        }
    }, [create.state]);
    return (
        <>
            <PageHeader title={"创建仓库"} ghost={false} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 16 }}>
                <Form onFinish={submit} form={form} labelCol={{ span: 2 }}>
                    <Form.Item label="名称" name={"name"} rules={[{ required: true }]} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="地址" name={"url"} rules={[{ required: true }]} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="说明" name={"remark"}>
                        <Input.TextArea autoSize={{ minRows: 2 }}></Input.TextArea>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};
