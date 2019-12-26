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
    const cloneReq = req.clone({
      // headers: req.headers.set("auth", localStorage.getItem("auth"))
      headers: new HttpHeaders({ auth: localStorage.getItem("auth") })
      // params: req.params.set("auth", localStorage.getItem("auth"))
    });
    return next.handle(cloneReq);
  }
}
