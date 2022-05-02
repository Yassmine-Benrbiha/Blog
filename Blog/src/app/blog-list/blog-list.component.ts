import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  isDetailsOpened: boolean = false;
  dataSource = [];
  upvotes: number = 0;
  downvotes: number = 0;
  condition: boolean = false;

  constructor(private blogsService: BlogService, private router: Router, private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
    this.getData();

  }

  getData()
  {
    this.blogsService.getData().subscribe((res: any) => {
      this.dataSource = res.data[0] as [];
      this.dataSource.forEach((element: any) => {
        element.upvotes = 0;
        element.downvotes = 0;
      });
      if(res.code == "200"){
        this.notificationService.show({
          content: res.message,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'top' },
          type: { style: 'success', icon: true }
        });
      }
      else{        
        this.notificationService.show({
        content: res.message,
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'error', icon: true }
      });
    }
    });
  }


  openDetails(id: any,upvotes =0,downvotes= 0): void {
    console.log(id)
    if (id!== null) {
      let ratio = true ? upvotes > downvotes :false;
      this.router.navigate([`/preview/${id}/${ratio}`]);
    }

    if (id == null) this.isDetailsOpened = true;
  }

  upvote(id: string) {
    this.dataSource.forEach((element: any) => {
      if (element.id == id) element.upvotes++;
    });
  }

  downvote(id: string) {
    this.dataSource.forEach((element: any) => {
      if (element.id == id) element.downvotes++;
    });
  }

  public close(): void {
    this.isDetailsOpened = false;
  }

  save(event: any) {}
}
