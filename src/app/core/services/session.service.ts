import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SessionState,
  SquidexToken,
} from 'src/app/shared/models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _token!: string;
  private sessionStateSubject = new BehaviorSubject<SessionState>({
    isAuth: false,
  });

  public sessionState$ = this.sessionStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  authCms() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const httpParams = new HttpParams().appendAll({
      grant_type: 'client_credentials',
      client_id: environment.cms.client_id,
      client_secret: environment.cms.client_secret,
      scope: 'squidex-api',
    });

    const url = environment.cms.domain + '/identity-server/connect/token';

    return this.http
      .post<SquidexToken>(url, httpParams, {
        headers,
      })
      .pipe(map((res) => `${res.token_type} ${res.access_token}`))
      .subscribe((token) => {
        this.setToken(token);
        this.sessionStateSubject.next({ isAuth: true });
      });
  }

  getToken() {
    return this._token;
  }

  private setToken(token: string) {
    this._token = token;
  }
}
