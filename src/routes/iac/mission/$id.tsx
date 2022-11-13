import AnsiUp from "ansi_up";
import { Button, Card, Descriptions, PageHeader, Space, Table, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { iacMissionApi } from "~/api";
import { IAC_MISSION_PROCESSING_STATES } from "~/constants";
import { MissionEvent } from "~/generated";
import { useAsync } from "~/hooks";
import { dateFormat, getNumberParam } from "~/utils";
import { IacMissionState } from "~/views/iac/mission/state";

export default () => {
    const params = useParams();
    const get = useAsync(iacMissionApi.getMission.bind(iacMissionApi));
    const cancel = useAsync(iacMissionApi.cancelMission.bind(iacMissionApi));
    const navigate = useNavigate();
    const ansi = new AnsiUp();

    useEffect(() => {
        const id = getNumberParam(params, "id");
        if (id) {
            get.run({ id });
        }
    }, [params.id]);
    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            if (IAC_MISSION_PROCESSING_STATES.has(get.data.state ?? 0)) {
                const timer = setTimeout(() => {
                    const id = getNumberParam(params, "id");
                    if (id) {
                        get.run({ id });
                    }
                }, 5 * 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [get.state]);

    const handleCancel = () => {
        const id = getNumberParam(params, "id");
        if (id) {
            cancel.run({ id });
        }
    };
    const extra = (
        <Space>
            <Button type="primary" onClick={handleCancel} disabled={(get.data?.state ?? 0) > 1} danger>
                取消
            </Button>
        </Space>
    );

    const columns: ColumnType<MissionEvent>[] = [
        { title: "host", dataIndex: "host", key: "host" },
        { title: "state", dataIndex: "state", key: "state" },
        {
            title: "changed",
            dataIndex: "changed",
            key: "changed",
            render: (v) => (v == 0 ? <Tag color="success">N</Tag> : <Tag color="error">Y</Tag>),
        },
        { title: "play", dataIndex: "play", key: "play" },
        { title: "task", dataIndex: "task", key: "task" },
        { title: "action", dataIndex: "taskAction", key: "taskAction" },
        { title: "start", dataIndex: "start", key: "start", render: dateFormat },
        { title: "end", dataIndex: "end", key: "end", render: dateFormat },
    ];

    const expandable = {
        expandedRowRender: (record: MissionEvent) => {
            delete record.res?.["changed"];
            delete record.res?.["_ansible_no_log"];
            delete record.res?.["_ansible_verbose_always"];
            delete record.res?.["invocation"];
            return <pre>{JSON.stringify(record.res, null, 4)}</pre>;
        },
        rowExpandable: (record: MissionEvent) => !!record.res,
    };

    return (
        <>
            <PageHeader
                title={"任务详情"}
                tags={[<IacMissionState key="state" state={get.data?.state ?? -1} />]}
                ghost={false}
                extra={extra}
                onBack={() => navigate("..")}
            />
            <Card style={{ marginTop: 16 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"playbook"}>{get.data?.playbook}</Descriptions.Item>
                    <Descriptions.Item label={"提交人"}>{get.data?.createdBy.username}</Descriptions.Item>
                    <Descriptions.Item label={"仓库"}>
                        <Link to={`/iac/repository/${get.data?.repository.id}`}>{get.data?.repository.name}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label={"commit"}>{get.data?.commit}</Descriptions.Item>
                    <Descriptions.Item label={"提交时间"}>{dateFormat(get.data?.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label={"完成时间"}>{dateFormat(get.data?.updatedAt)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ marginTop: 16 }} title={"事件"}>
                <Table
                    columns={columns}
                    dataSource={get.data?.events}
                    rowKey={"id"}
                    expandable={expandable}
                    pagination={false}
                    bordered
                />
            </Card>
            <Card style={{ marginTop: 16 }} title={"输出"}>
                <pre dangerouslySetInnerHTML={{ __html: ansi.ansi_to_html(get.data?.output ?? "") }}></pre>
            </Card>
        </>
    );
};
