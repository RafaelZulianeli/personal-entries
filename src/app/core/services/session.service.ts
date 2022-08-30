import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SessionState {
  token: string;
}

export interface SquidexToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _token = '';
  private sessionStateSubject = new BehaviorSubject<SessionState>({
    token: this._token,
  });

  public sessionState$ = this.sessionStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  generateToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const httpParams = new HttpParams().appendAll({
      grant_type: 'client_credentials',
      client_id: environment.cms.client_id,
      client_secret: environment.cms.client_secret,
      scope: 'squidex-api',
    });

    const url = environment.cms.domain + 'identity-server/connect/token';
    // .set('grant_type', 'client_credentials')
    // .set('client_id', clientId)
    // .set('client_secret', clientSecret)
    // .set('scope', 'squidex-api');

    this.http
      .post<SquidexToken>(url, httpParams, {
        headers,
      })
      .pipe(map((res) => `${res.token_type} ${res.access_token}`))
      .subscribe((token) => {
        this._token = token;
        this.sessionStateSubject.next({ token: this._token });
      });
  }
}
