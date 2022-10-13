import { CodeOutlined, ForkOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: "仓库", key: "repository", icon: <ForkOutlined /> },
        { label: "任务", key: "mission", icon: <CodeOutlined /> },
    ];

    return (
        <Layout>
            <Layout.Sider>
                <Menu
                    mode="inline"
                    items={items}
                    activeKey={location.pathname.split("/")[2]}
                    onClick={(info) => navigate(info.key)}
                />
            </Layout.Sider>
            <Layout.Content style={{ padding: "0 16px" }}>
                <Outlet />
            </Layout.Content>
        </Layout>
    );
};
