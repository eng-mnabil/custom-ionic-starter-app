import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  apiUrl:string = 'https://my-json-server.typicode.com/eng-mnabil/fake-server/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers() {
      return this.httpClient.get(this.apiUrl);
  }
}
