import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BlogsComponent } from "./views/blogs/blogs.component";
import { BlogComponent } from "./components/blog/blog.component";

@NgModule({
  declarations: [AppComponent, BlogsComponent, BlogComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
