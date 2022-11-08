import { Button, Card, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { authApi } from "~/api";
import { TOKEN_KEY } from "~/constants";
import { Login } from "~/generated";
import { useAsync } from "~/hooks";

export default () => {
    const [form] = Form.useForm<Login>();
    const login = useAsync(authApi.login.bind(authApi));
    const navigate = useNavigate();
    const [query] = useSearchParams();
    useEffect(() => {
        if (login.state === "COMPLETED") {
            window.localStorage.setItem(TOKEN_KEY, JSON.stringify(login.data));
            const next = query.get("next") ?? "/";
            navigate(next, { replace: true });
        }
        if (login.state === "FAILED") {
            notification.error({ message: login.err?.message });
        }
    }, [login.state]);

    const submit = (data: Login) => {
        login.run({ login: data });
    };
    return (
        <Card style={{ maxWidth: 600 }}>
            <Form form={form} onFinish={submit} labelCol={{ span: 3 }}>
                <Form.Item label="用户名" name={"username"}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name={"password"}>
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 21, offset: 3 }}>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
