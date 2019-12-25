import { BlogsComponent } from "./views/blogs/blogs.component";
import { AdminComponent } from "./views/admin/admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: BlogsComponent,
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
