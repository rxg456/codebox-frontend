import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { atom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { iacMissionApi } from "~/api";
import { IAC_MISSION_PROCESSING_STATES } from "~/constants";
import { Mission } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";
import { IacMissionState } from "~/views/iac/mission/state";

const timeAtom = atom(Date.now());
export interface IacMissionHistories {
    repository?: number;
    showRepository?: boolean;
    requiredRepository?: boolean;
}

const _IacMissionHistories = (props: IacMissionHistories) => {
    const list = useAsync(iacMissionApi.listMissions.bind(iacMissionApi));
    const { page, size, pagination, setPagination } = usePagination();
    const time = useAtomValue(timeAtom);

    useEffect(() => {
        if (props.requiredRepository === false || props.repository) {
            list.run({ page, size, repository: props.repository });
        }
    }, [props.repository, page, size, time]);

    useEffect(() => {
        if (list.state === "COMPLETED" && list.data) {
            setPagination(list.data);
            const processing = list.data.results?.filter((it) =>
                IAC_MISSION_PROCESSING_STATES.has(it.state ?? 0), 
            )?.length;
            if (processing) {
                const timer = setTimeout(() => {
                    if (props.requiredRepository === true || props.repository) {
                        list.run({ page, size, repository: props.repository });
                    }
                }, 2 * 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [list.state]);

    let columns: ColumnType<Mission>[] = [
        { title: "playbook", dataIndex: "playbook", key: "playbook" },
        { title: "状态", dataIndex: "state", key: "state", render: (v: number) => <IacMissionState state={v} /> },
        { title: "commit", dataIndex: "commit", key: "commit" },
        { title: "提交人", dataIndex: ["createdBy", "username"], key: "createdBy" },
        { title: "提交时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "完成时间", dataIndex: "updatedAt", key: "updatedAt", render: dateFormat },
        { title: "", dataIndex: "id", key: "op", render: (v: number) => <Link to={`/iac/mission/${v}`}>查看</Link> },
    ];

    if (props.showRepository) {
        columns = [
            {
                title: "仓库",
                dataIndex: ["repository", "name"],
                key: "repository",
                render: (v, record) => <Link to={`/iac/repository/${record.repository.id}`}>{v}</Link>,
            },
            ...columns,
        ];
    }

    return <Table columns={columns} dataSource={list.data?.results} rowKey="id" pagination={pagination} bordered />;
};

type IacMissionHistoriesType = typeof _IacMissionHistories & {
    useIacMissionHistoriesRefresh: () => () => void;
};

_IacMissionHistories.useIacMissionHistoriesRefresh = () => {
    const setTime = useUpdateAtom(timeAtom);
    return () => setTime(Date.now());
};

export const IacMissionHistories = _IacMissionHistories as IacMissionHistoriesType;
