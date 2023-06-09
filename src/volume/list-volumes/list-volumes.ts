import { IResponse, IContext, IListResponse, IListRequest } from '../../types';
import { IVolume } from '..';

export interface IListVolumesApiResponse extends IListResponse {
  volumes: IVolume[];
}

export interface IListVolumesApiRequest extends IListRequest {
  name?: string;
}

export type ListVolumesResponse = IResponse<IListVolumesApiResponse>;

export const listVolumes = ({
  httpClient,
}: IContext) => ({
  name = undefined,
  page = 1,
  per_page = 25,
}: IListVolumesApiRequest): Promise<Readonly<ListVolumesResponse>> => {
  const path = '/volumes';
  const query_params = {name, page, per_page};
  const url = `${path}`;

  return httpClient.get<IListVolumesApiResponse>(url, {params: query_params});
};
