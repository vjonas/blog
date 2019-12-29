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
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents: [AddBlogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
