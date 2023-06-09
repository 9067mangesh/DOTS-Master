import { IResponse, IContext } from '../../types';
import { ISnapshot } from '../../snapshot';

export interface ICreateVolumeSnapshotApiResponse {
  snapshot: ISnapshot;
}

export interface ICreateVolumeSnapshotApiRequest {
  name: string;
  tags?: string[];
  volume_id: string;
}

export type CreateVolumeSnapshotRes = IResponse<ICreateVolumeSnapshotApiResponse>;

export const createVolumeSnapshot = ({
  httpClient,
}: IContext) => ({
  name,
  tags,
  volume_id,
}: ICreateVolumeSnapshotApiRequest): Promise<Readonly<CreateVolumeSnapshotRes>> => {
  const path = '/volumes';
  const body = {name, tags};
  const url = `${path}/${volume_id}/snapshots`;

  return httpClient.post<ICreateVolumeSnapshotApiResponse>(url, body);
};
