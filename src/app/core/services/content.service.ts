import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SquidexPayloadtModel } from 'src/app/shared/models/squidex-payload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  public getContent(payload: SquidexPayloadtModel): Observable<any> {
    const url = environment.cms.domain + environment.cms.apiContent;

    return this.http.post<any>(url, payload).pipe(
      tap((res) => {
        console.log('ContentService tap: ', res);
      }),
      map((response) => {
        const key = Object.keys(response?.data).shift() as string;
        if (key) {
          return {
            data: response.data[key].map((item: any) => item.flatData),
          };
        }
        return { data: [] };
      })
    );
  }
}
