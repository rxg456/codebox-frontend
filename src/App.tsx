import { Layout, Menu } from "antd";
import { useRoutes } from "react-router-dom";
import routes from "virtual:generated-pages-react";

import styles from "./App.module.css";

const { Header, Content, Footer } = Layout;

export default () => {
    return (
        <Layout>
            <Header>
                <Menu theme="dark" />
            </Header>
            <Content className={styles.main}>{useRoutes(routes)}</Content>
            <Footer style={{ textAlign: "center" }}>codebox ©2022 Created by Ant UED</Footer>
        </Layout>
    );
};
