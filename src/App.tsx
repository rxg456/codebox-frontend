import { Layout, Menu } from "antd";
import { Link, useLocation, useRoutes } from "react-router-dom";
import routes from "virtual:generated-pages-react";

import styles from "~/App.module.css";

const { Header, Content, Footer } = Layout;

export default () => {
    const items = [{ label: <Link to={"/iac"}>基础设施</Link>, key: "iac" }];
    const location = useLocation();
    return (
        <Layout>
            <Header>
                <div className={styles.logo}></div>
                <Menu theme="dark" mode="horizontal" items={items} selectedKeys={[location.pathname.split("/")[1]]} />
            </Header>
            <Content className={styles.main}>{useRoutes(routes)}</Content>
            <Footer style={{ textAlign: "center" }}>codebox ©2022 Created by Ant UED</Footer>
        </Layout>
    );
};
