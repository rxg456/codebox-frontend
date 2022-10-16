import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect } from "react";

import { iacMissionApi } from "~/api";
import { Mission } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";
import { IacMissionState } from "~/views/iac/mission/state";

export interface IacMissionHistories {
    repository?: number;
    showRepository?: boolean;
    requiredRepository?: boolean;
}

export const IacMissionHistories = (props: IacMissionHistories) => {
    const list = useAsync(iacMissionApi.listMissions.bind(iacMissionApi));
    const { page, size, pagination, setPagination } = usePagination();
    useEffect(() => {
        if (props.requiredRepository === true || props.repository) {
            list.run({ page, size, repository: props.repository });
        }
    }, [props.repository, page, size]);

    useEffect(() => {
        if (list.state === "COMPLETED" && list.data) {
            setPagination(list.data);
        }
    }, [list.state]);

    let columns: ColumnType<Mission>[] = [
        { title: "playbook", dataIndex: "playbook", key: "playbook" },
        { title: "状态", dataIndex: "state", key: "state", render: (v: number) => <IacMissionState state={v} /> },
        { title: "commit", dataIndex: "commit", key: "commit" },
        { title: "提交时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "完成时间", dataIndex: "updatedAt", key: "updatedAt", render: dateFormat },
    ];

    if (props.showRepository) {
        columns = [{ title: "仓库", dataIndex: ["repository", "name"], key: "repository" }, ...columns];
    }

    return <Table columns={columns} dataSource={list.data?.results} rowKey="id" pagination={pagination} bordered />;
};
