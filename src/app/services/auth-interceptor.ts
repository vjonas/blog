import { getSetGuid } from "./../utils/guid";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let emoji = false;
    if (req.body && req.body.emoji) {
      emoji = true;
    }
    const cloneReq = req.clone({
      headers: new HttpHeaders({
        auth: localStorage.getItem("auth") || "none",
        guid: getSetGuid(),
        emoji: emoji + ""
      })
    });
    return next.handle(cloneReq);
  }
}
