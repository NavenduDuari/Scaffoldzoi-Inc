import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
    console.log('new requestManager');
  }

  public static getInstance(): RequestManager {
    if (!RequestManager.inst) {
      console.log('no inst present');
      RequestManager.inst = new RequestManager();
    }

    return RequestManager.inst;
  }

  public addToken = (token: string) => {
    this.token = token;
    console.log('adding the token', this.token);
  };

  public addServiceConfig = (serviceConfig: ServiceConfigI) => {
    const method = serviceConfig.method || HttpMethod.Get;
    this.serviceConfig = {
      ...serviceConfig,
      url: `http://localhost:8888/api${serviceConfig.url}`,
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
          console.log('perfrom :: ', this.token);
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
