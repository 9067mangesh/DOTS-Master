import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createContext } from '../../common';
import {getDropletDestroyStatus} from './get-droplet-destroy-status';
import * as MOCK from './get-droplet-destroy-status.mock';

describe('droplet', () => {
  const DROPLET_ID = 187000742;
  const URL = `/droplets/${DROPLET_ID}/destroy_with_associated_resources/status`;
  const TOKEN = process.env.TEST_TOKEN as string;
  const mock = new MockAdapter(axios);
  mock.onGet(URL).reply(
    MOCK.response.headers.status,
    MOCK.response.body,
    MOCK.response.headers,
  );
  const context = createContext({
    axios,
    token: TOKEN,
  });
  beforeEach(() => {
    mock.resetHistory();
  });
  describe('get-droplet-destroy-status', () => {
    it('should be a fn', () => {
      expect(typeof getDropletDestroyStatus).toBe('function');
    });
    it('should return a fn', () => {
      expect(typeof getDropletDestroyStatus(context)).toBe('function');
    });
    it('should return a valid response', async () => {
      const _getDropletDestroyStatus = getDropletDestroyStatus(context);
      const response = await _getDropletDestroyStatus({
        droplet_id: DROPLET_ID,
      });
      Object.assign(response, {request: mock.history.get[0]});
      /// validate response schema
      expect(typeof response).toBe('object');
      expect(typeof response.data).toBe('object');
      expect(typeof response.headers).toBe('object');
      expect(typeof response.request).toBe('object');
      expect(typeof response.status).toBe('number');
      /// validate request
      const {request} = response;
      expect(request.baseURL + request.url).toBe(context.endpoint + URL);
      expect(request.method).toBe('get');
      expect(request.headers).toMatchObject(MOCK.request.headers);
      /// validate data
      expect(response.data).toBeDefined();
      expect(response.data.droplet).toBeDefined();
      expect(response.data.resources).toBeDefined();
      const {droplet} = response.data;
      expect(typeof droplet.id).toBeDefined();
      expect(typeof droplet.name).toBe('string');
      /// validate headers
      const {headers, status} = response;
      expect(headers).toMatchObject(MOCK.response.headers);
      expect(status).toBe(MOCK.response.headers.status);
    });
  });
});
