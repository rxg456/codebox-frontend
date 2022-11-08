import { TOKEN_KEY } from "~/constants";
import {
    AuthApi,
    AuthorizationFromJSON,
    Configuration,
    IacMissionApi,
    IacRepositoryApi,
    Middleware,
    ResponseContext,
} from "~/generated";

const getToken = (): string => {
    const data = window.localStorage.getItem(TOKEN_KEY);
    if (!data) {
        return "";
    }
    const obj = JSON.parse(data);
    const authorization = AuthorizationFromJSON(obj);
    return authorization.token;
};

const auth: Middleware = {
    async post(context: ResponseContext): Promise<Response | void> {
        if (context.response.status === 401 || context.response.status === 403) {
            window.location.replace(`/login?next=${window.location.pathname}`);
            return;
        }
        return context.response;
    },
};

const configuration = new Configuration({ basePath: "", accessToken: getToken, middleware: [auth] });
export const iacRepositoryApi = new IacRepositoryApi(configuration);
export const iacMissionApi = new IacMissionApi(configuration);
export const authApi = new AuthApi(configuration);
