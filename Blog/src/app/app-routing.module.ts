import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';

export const routes: Routes = [
  {
    path: "",
    component: BlogListComponent
  },
  {
    path: "preview/:id",
    component: BlogPreviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
