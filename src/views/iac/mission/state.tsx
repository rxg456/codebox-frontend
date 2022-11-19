import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    FieldTimeOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const IacMissionState = (props: { state: number }) => {
    switch (props.state) {
        case 0:
            return (
                <Tag icon={<ClockCircleOutlined />} color="default">
                    PENDING
                </Tag>
            );
        case 1:
            return (
                <Tag icon={<SyncOutlined spin />} color="processing">
                    RUNNING
                </Tag>
            );
        case 2:
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    COMPLETED
                </Tag>
            );
        case 3:
            return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    FAILED
                </Tag>
            );
        case 4:
            return (
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    CANCELED
                </Tag>
            );
        case 5:
            return (
                <Tag icon={<FieldTimeOutlined />} color="error">
                    TIMEOUT
                </Tag>
            );
        case 6:
            return (
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    CANCELING
                </Tag>
            );
        default:
            return <></>;
    }
};
