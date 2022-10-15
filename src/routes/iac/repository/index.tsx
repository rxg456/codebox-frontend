import { Button, Card, PageHeader, Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { iacRepositoryApi } from "~/api";
import { Repository } from "~/generated";
import { useAsync, usePagination } from "~/hooks";

export default () => {
    const list = useAsync(iacRepositoryApi.listRepositories.bind(iacRepositoryApi));
    const { page, size, pagination, setPagination } = usePagination();
    useEffect(() => {
        list.run({ page, size });
    }, [page, size]);
    useEffect(() => {
        if (list.state === "COMPLETED" && list.data) {
            setPagination(list.data);
        }
    }, [list.state]);
    const columns: ColumnType<Repository>[] = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "说明", dataIndex: "remark", key: "remark" },
        { title: "地址", dataIndex: "url", key: "url" },
        {
            title: "操作",
            dataIndex: "id",
            key: "op",
            render: (value: number) => {
                return (
                    <Space>
                        <Link to={value.toString()}>查看</Link>
                    </Space>
                );
            },
        },
    ];
    const extra = (
        <Button type={"primary"}>
            <Link to={"create"}>创建</Link>
        </Button>
    );
    return (
        <>
            <PageHeader title="仓库列表" ghost={false} extra={extra} />
            <Card style={{ marginTop: 16 }}>
                <Table
                    loading={list.loading}
                    columns={columns}
                    dataSource={list.data?.results}
                    rowKey={"id"}
                    pagination={pagination}
                    bordered
                ></Table>
            </Card>
        </>
    );
};
