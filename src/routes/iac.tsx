import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

export default () => {
    const items = [
        { label: "仓库", key: "repository" },
        { label: "任务", key: "mission" },
    ];

    return (
        <Layout>
            <Layout.Sider>
                <Menu mode="inline" items={items} />
            </Layout.Sider>
            <Layout.Content>
                <Outlet />
            </Layout.Content>
        </Layout>
    );
};
