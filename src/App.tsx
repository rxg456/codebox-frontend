import { Layout, Menu } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import IacRoute from "~/routes/iac";
import IacRouteIndex from "~/routes/iac/index";
import IacRepositoryRoute from "~/routes/iac/repository";
import IacRepositoryDetailRoute from "~/routes/iac/repository/$id";

import styles from "./App.module.css";

const { Header, Content, Footer } = Layout;

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Header>
                    <Menu theme="dark" />
                </Header>
                <Content className={styles.main}>
                    <Routes>
                        <Route path="/" element={<IacRoute />}>
                            <Route index element={<IacRouteIndex />}></Route>
                            <Route path="repository" element={<IacRepositoryRoute />}></Route>
                            <Route path="repository/:id" element={<IacRepositoryDetailRoute />}></Route>
                        </Route>
                    </Routes>
                </Content>
                <Footer style={{ textAlign: "center" }}>codebox ©2022 Created by Ant UED</Footer>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
