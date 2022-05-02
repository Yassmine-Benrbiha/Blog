import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  fastApi= environment.fastapi;
  constructor(private httpClient: HttpClient) { }

  private generateHeaders() {
    return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*' }),
    };
  }



  public getData(id?: string) {
    if(id) return this.httpClient.get( this.fastApi+'/blogs/'+`${id}`, this.generateHeaders());
    return this.httpClient.get( this.fastApi, this.generateHeaders());
  }
}
