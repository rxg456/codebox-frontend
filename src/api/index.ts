import { Configuration, IacMissionApi, IacRepositoryApi } from "~/generated";

const configuration = new Configuration({ basePath: "" });
export const iacRepositoryApi = new IacRepositoryApi(configuration);
export const iacMissionApi = new IacMissionApi(configuration);
