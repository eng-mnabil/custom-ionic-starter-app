import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  apiUrl:string = 'https://my-json-server.typicode.com/eng-mnabil/fake-server';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers() {
      return this.httpClient.get(this.apiUrl+'/users');
  }

  getColors() {
    return this.httpClient.get(this.apiUrl+'/colors');
  }

  uploadImg(data) {
    return this.httpClient.post(this.apiUrl+'/users', data);
  }
}
