import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LocalStorageKey } from './types';

export enum HttpMethod {
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
    console.log('new requestManager');
  }

  public static getInstance() {
    if (!this.inst) {
      this.inst = new RequestManager();
    }
    console.log('getInstance ::');

    return this.inst;
  }

  public addToken(token: string) {
    this.token = token;
  }

  public addServiceConfig(serviceConfig: ServiceConfigI) {
    this.serviceConfig = {
      ...serviceConfig,
      url: `http://localhost:8888/api${serviceConfig.url}`,
      method: serviceConfig.method || HttpMethod.Get,
      data: {
        ts: Date.now(),
        payload: serviceConfig.data,
      },
      headers: serviceConfig.headers || {},
    };
  }

  public perform(): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
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
            this.serviceConfig.headers.Authorization = this.token;
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
}
