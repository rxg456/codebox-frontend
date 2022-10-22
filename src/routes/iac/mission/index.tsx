import { Card, PageHeader } from "antd";

import { IacMissionHistories } from "~/views/iac/mission/histories";

export default () => {
    return (
        <>
            <PageHeader title={"任务执行历史"} ghost={false} />
            <Card style={{ marginTop: 16 }}>
                <IacMissionHistories requiredRepository={false} showRepository={true} />
            </Card>
        </>
    );
};
