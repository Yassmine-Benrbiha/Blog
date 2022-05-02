import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { NotificationService } from '@progress/kendo-angular-notification';
import { BlogService } from './blog.service';
import { HttpClientModule } from '@angular/common/http';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogDetailsComponent,
    BlogPreviewComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    WindowModule,
    ButtonsModule,
    ReactiveFormsModule,
    LabelModule,
    FormsModule,
    InputsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [NotificationService,BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
