import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AgoserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgoserviceProvider {
  agoToken : string = "";
  agoExpiry : string = "";

  constructor(public httpClient: HttpClient) {
    console.log('Hello AgoserviceProvider Provider');
  }

  login() {
    let stuff = this.httpClient.get("http://localhost:3000/loginremote");
    // let stuff = this.httpClient.get("http://agopassport/heroku.com/login");
    return stuff;
  }
  auth() {
    let stuff = this.httpClient.get("http://localhost:3000/authremote/arcgis");
    // this.agoToken = stuff.access_token;
    // this.agoExpiry = stuff.expires_in;
    console.log(this.agoToken);
    return stuff;
  }

  loadAddress() {
    // let fetchedItems = this.httpClient.get('http://localhost:3000/queryremote');
    let fetchedItems = this.httpClient.get('http://agopassport/heroku.com/queryremote');

    // let fetchedItems = await this.httpClient.get('http://localhost:3000/auth/arcgis/callback').toPromise();
    console.log(fetchedItems);
    return fetchedItems;
  }

  loadItems() {
    let fetchedItems = this.httpClient.get('http://localhost:3000/listingsremote');
    // let fetchedItems = this.httpClient.get('http://agopassport.herokuapp.com/listingsremote');
    // let fetchedItems = await this.httpClient.get('http://localhost:3000/auth/arcgis/callback').toPromise();
    console.log(fetchedItems);
    return fetchedItems

  }

}
