import { ImageModule } from './components/image/image.module';
import { LightboxModule } from './components/lightbox/lightbox.module';
import { AuthInterceptor } from './services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogsComponent } from './views/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { EmojiPopupComponent } from './components/emoji-popup/emoji-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { DragDropModule } from '@angular/cdk/drag-drop';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, ORIGIN, REGION } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    LoginComponent,
    AddBlogComponent,
    EmojiPopupComponent,
    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    LightboxModule,
    ImageModule,
    DragDropModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  entryComponents: [AddBlogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
