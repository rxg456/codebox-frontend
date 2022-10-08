import { useParams } from "react-router-dom";

export default () => {
    const params = useParams();

    return <h1>{params.id}</h1>;
};
