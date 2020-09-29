import { AuthGuard } from './auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LetterBindingDirective } from './directives/letter-binding.directive/letter-binding.directive';
import { ImageComponent } from './components/image/image.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogsComponent } from './views/blogs/blogs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { GoogleSigninComponent } from './components/google-signin.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: BlogsComponent,
    data: { admin: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: GoogleSigninComponent,
    data: { admin: true },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatSnackBarModule,
    MatDialogModule,
    // LightboxModule,
    // ImageModule,
    // LetterBindingModule,
  ],
  declarations: [
    GoogleSigninComponent,
    AppComponent,
    BlogsComponent,
    LoginComponent,
    BlogComponent,
    LightboxComponent,
    ImageComponent,
    LetterBindingDirective,
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  // entryComponents: [AddBlogComponent],
})
export class AppModule {}
