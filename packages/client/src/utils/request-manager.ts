import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import uri from '../uri';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
}

export interface ServiceConfigI {
  url: string;
  method?: HttpMethod;
  authReq: boolean;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

class RequestManager {
  private static inst: RequestManager;

  private token: string;

  private serviceConfig: ServiceConfigI;

  private constructor() {
    this.token = '';
    this.serviceConfig = {} as ServiceConfigI;
  }

  public static getInstance(): RequestManager {
    if (!RequestManager.inst) {
      RequestManager.inst = new RequestManager();
    }

    return RequestManager.inst;
  }

  public addToken = (token: string) => {
    this.token = token;
  };

  public addServiceConfig = (serviceConfig: ServiceConfigI) => {
    const method = serviceConfig.method || HttpMethod.Get;
    this.serviceConfig = {
      ...serviceConfig,
      url: `${uri.serverBaseURL}/api${serviceConfig.url}`,
      method,
      data:
        method === HttpMethod.Post
          ? {
              ts: Date.now(),
              payload: serviceConfig.data,
            }
          : undefined,
      params:
        method === HttpMethod.Get
          ? {
              ts: Date.now(),
              payload: JSON.stringify(serviceConfig.data),
            }
          : undefined,
      headers: serviceConfig.headers || {},
    };
  };

  public perform = (): Promise<AxiosResponse> =>
    new Promise((resolve, reject) => {
      try {
        if (this.serviceConfig.authReq) {
          if (!this.token) {
            console.log('NO auth token');
            reject();
          } else {
            if (!this.serviceConfig.headers) {
              this.serviceConfig.headers = {};
            }
            this.serviceConfig.headers.Authorization = `Bearer ${this.token}`;
          }
        }

        const req = this.serviceConfig;

        axios(req as AxiosRequestConfig).then((resp: AxiosResponse) => {
          resolve(resp);
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
}

export default RequestManager.getInstance();
