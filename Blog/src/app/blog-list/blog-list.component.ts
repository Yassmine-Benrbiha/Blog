import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private blogsService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogsService.getData().subscribe((res) => {
      this.dataSource = res as [];
      this.dataSource.forEach((element: any) => {
        element.upvotes = 0;
        element.downvotes = 0;
      });
    });
  }

  bgId: string = '';
  openDetails(id: any): void {
    console.log(id)
    //this.router.navigate([`/preview/${id}`]);
   this.bgId = id;
    this.isDetailsOpened = true;
    let index = this.dataSource.findIndex((el: any) => el.bgId == id );
    let blog = this.dataSource[index] as any;
    if (blog.downvotes !== 0 && blog.upvotes / blog.downvotes > 1)
      this.condition = true;
    else this.condition = false;
    console.log(this.condition);
  }

  upvote(id: string) {
    this.dataSource.forEach((element: any) => {
      if (element.bgId == id) element.upvotes++;
    });
  }

  downvote(id: string) {
    this.dataSource.forEach((element: any) => {
      if (element.bgId == id) element.downvotes++;
    });
  }

  public close(): void {
    this.isDetailsOpened = false;
  }

  save(event: any) {}
}
