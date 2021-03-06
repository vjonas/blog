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

  public send(msg: string = "default msg") {
    (<any>window).ga(
      "send",
      "event",
      "appcomponent-category",
      "onderwerp,click",
      msg
    );
  }
}
