import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';

/*
  Generated class for the AgoserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgoserviceProvider {
  agoToken : string = "";
  agoExpiry : string = "";
  webmapId : string = "4c3ccb95474c4c4d89ec191d69ba1080";
  private esriwebmap;
  private esrimapview;
  private esriPoint;
  private esriSpatialReference;
  private items : any;

  async loadEsriModules() {
      const options = {
        url: 'https://js.arcgis.com/4.8/'
      };
      const [ WebMap, MapView, Point, SpatialReference] = await loadModules(
        [ 'esri/WebMap', 'esri/views/MapView', 'esri/geometry/Point', 'esri/geometry/SpatialReference'], options);

              this.esriwebmap = WebMap;
              this.esrimapview = MapView;
              this.esriPoint = Point;
              this.esriSpatialReference = SpatialReference;
    }

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
    let unpacked = stuff.subscribe(
      data => {
        let d : any = data;
        this.agoToken = d.access_token;
        this.agoExpiry = d.expires_in;
        console.log(`token : ${this.agoToken}`);
        console.log(`expires_in : ${this.agoExpiry}`);
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading items')
    );
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

  loadItemsRest() {
    const url : string = 'https://www.arcgis.com/sharing/rest/content/items/4c3ccb95474c4c4d89ec191d69ba1080?f=json&token='
      + this.agoToken;

    let fetchedItems = this.httpClient.get(url);
    let unpacked = fetchedItems.subscribe(
      data => {
        this.items = data;
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        console.log('done loading items');
        console.log(this.items);
        return fetchedItems;
      }
    );
    console.log(unpacked);
    console.log(fetchedItems);
    return fetchedItems;
  }

  async loadMap() {
    const options = {
      url: 'https://js.arcgis.com/4.11/'
    };
    const [ WebMap, MapView, Point, SpatialReference] = await loadModules(
      [ 'esri/WebMap', 'esri/views/MapView', 'esri/geometry/Point', 'esri/geometry/SpatialReference'], options);

    this.esriwebmap = WebMap;
    this.esrimapview = MapView;
    this.esriPoint = Point;
    this.esriSpatialReference = SpatialReference;

    let webmap = new this.esriwebmap({
      portalItem: {
        // autocasts as new PortalItem()
        id: this.webmapId
      }
    });

    let view = new this.esrimapview({
      map: webmap,
      container: "viewDiv"
    });
  }

}
