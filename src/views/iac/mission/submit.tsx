import { Form, Input, Modal } from "antd";
import { atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";

import { iacMissionApi } from "~/api";
import { Mission, MissionCreation } from "~/generated";
import { useAsync } from "~/hooks";

const visibleAtom = atom<boolean>(false);

export interface IacMissionSubmitProps {
    repository?: number;
    onSubmitted?: (mission: Mission) => void;
}
const _IacMissionSubmit = (props: IacMissionSubmitProps) => {
    const exec = useAsync(iacMissionApi.createMission.bind(iacMissionApi));
    const [visible, setVisible] = useAtom(visibleAtom);
    const [form] = Form.useForm<MissionCreation>();

    useEffect(() => {
        if (exec.state === "COMPLETED" && exec.data) {
            props.onSubmitted?.(exec.data);
        }
    }, [exec.state]);

    const handleExecute = () => {
        form.submit();
    };

    const handleFormSubmit = (value: MissionCreation) => {
        if (props.repository && value.playbook) {
            exec.run({ missionCreation: { ...value, repository: props.repository } });
        }
        setVisible(false);
    }

    return (
        <Modal
            visible={visible}
            title={"提交任务"}
            confirmLoading={exec.loading}
            onCancel={() => setVisible(false)}
            onOk={handleExecute}
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item label="playbook" name="playbook" rules={[{ required: true }]} required>
                    <Input />
                </Form.Item>
                <Form.Item label="inventories" name="inventories">
                    <Input.TextArea autoSize={{ minRows: 6 }}></Input.TextArea>
                </Form.Item>
            </Form>
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
