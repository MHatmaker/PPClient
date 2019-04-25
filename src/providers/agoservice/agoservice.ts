import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AgoserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgoserviceProvider {

  constructor(public httpClient: HttpClient) {
    console.log('Hello AgoserviceProvider Provider');
  }

  loadAddress() {
    let fetchedItems = this.httpClient.get('http://localhost:3000/queryremote');
    // let fetchedItems = await this.httpClient.get('http://localhost:3000/auth/arcgis/callback').toPromise();
    console.log(fetchedItems);
    return fetchedItems;
  }

  loadItems() {
    let fetchedItems = this.httpClient.get('http://localhost:3000/listingsremote');
    // let fetchedItems = await this.httpClient.get('http://localhost:3000/auth/arcgis/callback').toPromise();
    console.log(fetchedItems);
    return fetchedItems

  }

}
