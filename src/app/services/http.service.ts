import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getLocalFile(fileName: string) {
    return this.http.get(fileName);
  }

  public login() {}

  // public isAuthenticated = ()=>{
  // return this.http.post()
  // }
}
