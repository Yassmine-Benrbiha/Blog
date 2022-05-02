import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() bgId: string= "";
  dislpayDetails: boolean = true;
  blogForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required]),
  });

  constructor(private notificationService: NotificationService, private blogsService: BlogService) { }
  
  ngOnInit(): void {
    console.log("bgId", this.bgId)
    this.blogsService.getData(this.bgId).subscribe((res) =>{
      
      this.blogForm.patchValue(res);
    })
  }

  close() {
    this.cancel.emit(true);
  }

  public saveBlog(blogFormValue: any) {

    if (this.blogForm.valid) {
     
    }
    if (this.blogForm.invalid) {
      this.notificationService.show({
        content: "Required data is missing",
        animation: { type: "slide", duration: 800 },
        position: { horizontal: "center", vertical: "top" },
        type: { style: "error", icon: true },
        closable: true,
      });
    }
  }
}
