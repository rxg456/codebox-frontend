import { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface UsePaginationProps {
    page?: number;
    size?: number;
    count?: number;
}

const getNumber = (query: URLSearchParams, key: string, defaultValue: number): number => {
    const value = Number.parseInt(query.get(key) ?? defaultValue.toString());
    if (Number.isSafeInteger(value)) {
        return value;
    }
    return defaultValue;
};

export const usePagination = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(getNumber(query, "page", 1));
    const [size, setSize] = useState(getNumber(query, "size", 20));

    const handleChange = (page: number, pageSize: number) => {
        query.set("page", page.toString());
        query.set("size", pageSize.toString());
        setQuery(query);
    };

    const [pagination, setPagination] = useState<PaginationProps>({
        current: 1,
        pageSize: 20,
        total: 0,
        onChange: handleChange,
    });

    useEffect(() => {
        setPage(getNumber(query, "page", 1));
        setSize(getNumber(query, "size", 20));
    }, [query]);

    const set = (props: UsePaginationProps) => {
        setPagination({ current: props.page, pageSize: props.size, total: props.count, onChange: handleChange });
    };
    return { page, size, query, pagination, setPagination: set };
};
