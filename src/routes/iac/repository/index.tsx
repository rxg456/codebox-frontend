import { Card, PageHeader, Table } from "antd";
import { ColumnType } from "antd/lib/table";

export default () => {
    const columns: ColumnType<any>[] = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "说明", dataIndex: "remark", key: "remark" },
        { title: "地址", dataIndex: "url", key: "url" },
    ];
    const data = [
        { name: "ping1", remark: "测试一页", url: "git@github.com" },
        { name: "ping2", remark: "测试一页", url: "git@github.com" },
    ];
    return (
        <>
            <PageHeader title="仓库列表" ghost={false} />
            <Card style={{ marginTop: 16 }}>
                <Table columns={columns} dataSource={data} bordered></Table>
            </Card>
        </>
    );
};
