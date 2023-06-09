import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createContext } from '../../common';
import {getClusterlintDiagnostics} from './get-clusterlint-diagnostics';
import * as MOCK from './get-clusterlint-diagnostics.mock';

describe('kubernetes', () => {
  const KUBERNETES_CLUSTER_ID = 'cluster-id';
  const URL = `/kubernetes/clusters/${KUBERNETES_CLUSTER_ID}/clusterlint`;
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
  describe('get-node-pool', () => {
    it('should be a fn', () => {
      expect(typeof getClusterlintDiagnostics).toBe('function');
    });
    it('should return a fn', () => {
      expect(typeof getClusterlintDiagnostics(context)).toBe('function');
    });
    it('should return a valid response', async () => {
      const _getClusterlintDiagnostics = getClusterlintDiagnostics(context);
      const response = await _getClusterlintDiagnostics({
        kubernetes_cluster_id: KUBERNETES_CLUSTER_ID,
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
      const {run_id, diagnostics} = response.data;
      expect(typeof run_id).toBe('string');
      expect(Array.isArray(diagnostics)).toBe(true);
      /// validate headers
      const {headers, status} = response;
      expect(headers).toMatchObject(MOCK.response.headers);
      expect(status).toBe(MOCK.response.headers.status);
    });
  });
});
