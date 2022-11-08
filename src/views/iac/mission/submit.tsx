import { Input, Modal } from "antd";
import { atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { KeyboardEvent, useEffect, useState } from "react";

import { iacMissionApi } from "~/api";
import { Mission } from "~/generated";
import { useAsync } from "~/hooks";

const visibleAtom = atom<boolean>(false);

export interface IacMissionSubmitProps {
    repository?: number;
    onSubmitted?: (mission: Mission) => void;
}
const _IacMissionSubmit = (props: IacMissionSubmitProps) => {
    const exec = useAsync(iacMissionApi.createMission.bind(iacMissionApi));
    const [playbook, setPlaybook] = useState("");
    const [visible, setVisible] = useAtom(visibleAtom);

    useEffect(() => {
        if (exec.state === "COMPLETED" && exec.data) {
            props.onSubmitted?.(exec.data);
        }
    }, [exec.state]);

    const handleExecute = () => {
        if (props.repository && playbook) {
            exec.run({ missionCreation: { repository: props.repository, playbook } });
        }
        setVisible(false);
    };

    const handleEnter = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
            handleExecute();
        }
    };

    return (
        <Modal
            visible={visible}
            title={"执行playbook"}
            confirmLoading={exec.loading}
            onCancel={() => setVisible(false)}
            onOk={handleExecute}
        >
            <Input value={playbook} onChange={(e) => setPlaybook(e.target.value)} onKeyDown={handleEnter} />
        </Modal>
    );
};

type IacMissionSubmitType = typeof _IacMissionSubmit & {
    useIacMissionSubmit: () => [() => void, () => void];
};

_IacMissionSubmit.useIacMissionSubmit = () => {
    const setVisible = useUpdateAtom(visibleAtom);
    return [() => setVisible(true), () => setVisible(false)];
};

export const IacMissionSubmit = _IacMissionSubmit as IacMissionSubmitType;
