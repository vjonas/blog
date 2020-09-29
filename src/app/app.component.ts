import { HttpService } from './services/http.service';
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Blog } from './models/blog.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public blogs$: Observable<any> = this.http2.get<any>(`assets/blog-posts.json`);

  @HostListener('window:resize') resizing = () => this.resize();

  private resize = () => {
    let vh = window.innerHeight;
    (document.querySelector('.background') as HTMLDivElement).style.setProperty('--vh', `${vh}px`);

    (document.querySelector('app-blogs') as HTMLElement).style.setProperty('--vh', `${vh}px`);
  };

  constructor(
    private af: AngularFirestore,
    private router: Router,
    private http: HttpService,
    private http2: HttpClient,
    private afAuth: AngularFireAuth,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && environment.production) {
        this.http.send(`routed: ${event.urlAfterRedirects}`);
      }
    });

    this.afAuth.authState.subscribe(console.log);
    setTimeout(
      () =>
        this.af
          .collection('blogs')
          .valueChanges()
          .subscribe(data => console.log('data', data)),
      1000,
    );
  }
}
