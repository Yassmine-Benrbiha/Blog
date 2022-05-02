import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent implements OnInit {
  bgId = this.route.snapshot.paramMap.get('id');
  ratio = this.route.snapshot.paramMap.get('ratio');
  blog:any="";
  
  constructor(private blogsService: BlogService,private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit(): void {
    console.log("bgId", this.bgId, this.ratio)
    this.blogsService.getData(this.bgId).subscribe((res:any) =>{
      this.blog =  res.data[0];
      if(res.code == "200"){
        this.notificationService.show({
          content: res.message,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'top' },
          type: { style: 'success', icon: true }
        });
      } else{
        this.notificationService.show({
          content: res.message,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'top' },
          type: { style: 'error', icon: true }
        }); 
      }
    })
  }

}
