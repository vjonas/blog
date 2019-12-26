import { AuthInterceptor } from "./services/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BlogsComponent } from "./views/blogs/blogs.component";
import { BlogComponent } from "./components/blog/blog.component";
import { AdminComponent } from "./views/admin/admin.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
