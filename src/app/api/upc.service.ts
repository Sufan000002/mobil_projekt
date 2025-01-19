import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UpcResponse } from "../model/upc-response";

@Injectable({
  providedIn: "root",
})
export class UpcService {
  constructor(private http: HttpClient) {}

  getData(barcode: string): Observable<UpcResponse> {
    const url = `${environment.apiUrl}/${barcode}?apikey=${environment.apiKey}`;

    const header = new HttpHeaders({
      Authorization: `Bearer ${environment.apiKey}`,
    });

    return this.http.get<UpcResponse>(url, { headers: header });
  }
}
