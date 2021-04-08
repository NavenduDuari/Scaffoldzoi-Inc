import axios, { AxiosRequestConfig } from 'axios';

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
}

export interface ServiceConfigI {
  url: string;
  method?: HttpMethod;
  authReq: boolean;
  data: Record<string, any>;
  headers?: Record<string, string>;
}

export default class RequestManager {
  private static inst: RequestManager;

  private token: string;

  private serviceConfig: ServiceConfigI;

  private constructor() {
    this.token = '';
    this.serviceConfig = {} as ServiceConfigI;
  }

  public static getInstance() {
    if (!this.inst) {
      this.inst = new RequestManager();
    }

    return this.inst;
  }

  public addToken(token: string) {
    this.token = token;
  }

  public addServiceConfig(serviceConfig: ServiceConfigI) {
    this.serviceConfig = {
      ...serviceConfig,
      url: `http://localhost:8888/api/${serviceConfig.url}`,
      method: serviceConfig.method || HttpMethod.Get,
      data: {
        ts: Date.now(),
        payload: serviceConfig.data,
      },
      headers: serviceConfig.headers || {},
    };
  }

  public perform(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.serviceConfig.authReq) {
          if (!this.token) {
            console.log('NO auth token');
            reject();
          } else {
            if (!this.serviceConfig.headers) {
              this.serviceConfig.headers = {};
            }
            this.serviceConfig.headers.Authorization = this.token;
          }
        }

        const req = this.serviceConfig;

        axios(req as AxiosRequestConfig).then((resp) => {
          resolve(resp);
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}
