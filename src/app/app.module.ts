import { ImageModule } from "./components/image/image.module";
import { LightboxModule } from "./components/lightbox/lightbox.module";
import { AuthInterceptor } from "./services/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BlogsComponent } from "./views/blogs/blogs.component";
import { BlogComponent } from "./components/blog/blog.component";
import { LoginComponent } from "./components/login/login.component";
import { AddBlogComponent } from "./components/add-blog/add-blog.component";
import { EmojiPopupComponent } from "./components/emoji-popup/emoji-popup.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

import { DragDropModule } from "@angular/cdk/drag-drop";
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig
} from "ngx-cookieconsent";

const cookieConsent: NgcCookieConsentConfig = {
  cookie: {
    // domain: "blog.jonasvercammen.dev"
    domain: "localhost" // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: "#000"
    },
    button: {
      background: "#f1d600"
    }
  },
  theme: "edgeless",
  type: "opt-out"
};

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    LoginComponent,
    AddBlogComponent,
    EmojiPopupComponent
  ],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConsent),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    LightboxModule,
    ImageModule,
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents: [AddBlogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
