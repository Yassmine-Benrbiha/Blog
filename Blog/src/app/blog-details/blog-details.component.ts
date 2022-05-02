import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent {
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  dislpayDetails: boolean = true;
  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
  });
  disabled: boolean= false;

  constructor(
    private notificationService: NotificationService,
    private blogsService: BlogService  ) {}

  close() {
    this.cancel.emit(true);
    location.reload();
  }

  public saveBlog(blogFormValue: any) {
    if (this.blogForm.valid) {
      this.disabled=true;
      this.blogsService.create(blogFormValue).subscribe((data:any)=>
      {
        if(data.code == "200"){
          this.notificationService.show({
            content: data.message,
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'top' },
            type: { style: 'success', icon: true }
          });
          this.cancel.emit(true);
          location.reload();
        }
        else{
          this.notificationService.show({
            content: data.message,
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'top' },
            type: { style: 'error', icon: true }
          }); 
        }
      })
    }

    if (this.blogForm.invalid) {
      this.notificationService.show({
        content: 'Required data is missing',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'error', icon: true },
        closable: true,
      });
    }
  }
}
