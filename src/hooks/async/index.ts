import { useState } from "react";

export function useAsync<P, R>(service: (param: P) => Promise<R>) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<R>();
    const [err, setErr] = useState<Error>();
    const [state, setState] = useState<"PENDING" | "RUNNING" | "COMPLETED" | "FAILED">("PENDING");

    const run = (param: P) => {
        setLoading(true);
        setState("RUNNING");
        service(param)
            .then((res: R) => {
                setData(res);
                setState("COMPLETED");
            })
            .catch((err) => {
                setErr(err);
                setState("FAILED");
            })
            .finally(() => setLoading(false));
    };

    return { data, loading, err, state, run };
}
