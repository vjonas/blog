import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LetterBindingDirective } from './directives/letter-binding.directive/letter-binding.directive';
import { ImageComponent } from './components/image/image.component';
// import { LetterBindingModule } from './directives/letter-binding.directive/letter-binding.module';
// import { ImageModule } from './components/image/image.module';
// import { LightboxModule } from './components/lightbox/lightbox.module';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogsComponent } from './views/blogs/blogs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, ORIGIN, REGION } from '@angular/fire/functions';

import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { LightboxComponent } from './components/lightbox/lightbox.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: BlogsComponent,
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
