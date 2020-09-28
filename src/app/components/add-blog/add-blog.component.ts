import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  public date = new Date().toISOString().split('T')[0];
  public title = '';

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AddBlogComponent>) {}

  public submit(body: HTMLTextAreaElement) {
    this.dialogRef.close(
      this.http.post(`${environment.url}blogs/add`, {
        title: this.title,
        date: this.date,
        body: body.value,
      }),
    );
  }
}
