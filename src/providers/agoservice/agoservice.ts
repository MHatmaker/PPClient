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
  private esriId;
  private esriOauthInfo

  async loadEsriModules() {
      const options = {
        url: 'https://js.arcgis.com/4.8/'
      };
      const [ WebMap, MapView, Point, SpatialReference, IdentityManager, OAuthInfo] = await loadModules(
        [ 'esri/WebMap', 'esri/views/MapView', 'esri/geometry/Point', 'esri/geometry/SpatialReference',
          'esri/identity/IdentityManager', 'esri/identity/OAuthInfo'], options);

              this.esriwebmap = WebMap;
              this.esrimapview = MapView;
              this.esriPoint = Point;
              this.esriSpatialReference = SpatialReference;
              this.esriId = IdentityManager;
              this.esriOauthInfo = OAuthInfo;
    }

  constructor(public httpClient: HttpClient) {
    console.log('Hello AgoserviceProvider Provider');
    this.loadEsriModules();
  }

  login() {
    // let stuff = this.httpClient.get("http://localhost:3000/loginremote");
   let stuff = this.httpClient.get("http://agopassport/heroku.com/login");
    return stuff;
  }
  auth() {
    // let stuff = this.httpClient.get("http://localhost:3000/authremote/arcgis");
    let stuff = this.httpClient.get("https://maplinkr-simpleserver.herokuapp.com/authremote/arcgis");
    let unpacked = stuff.subscribe(
      data => {
        let d : any = data;
        this.agoToken = d.access_token;
        this.agoExpiry = d.expires_in;
        console.log(`token : ${this.agoToken}`);
        console.log(`expires_in : ${this.agoExpiry}`);
        this.registerToken(data);
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
    // let fetchedItems = this.httpClient.get('http://localhost:3000/listingsremote');
    let fetchedItems = this.httpClient.get('https://maplinkr-simpleserver.herokuapp.com/listingsremote');
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
registerToken(tokenInfo) {
	//The parameters required are not documented. This is why this sample is helpful ;)
	var credentialsJSON = {
		serverInfos: [{
			// server: "https://sampleserver6.arcgisonline.com",
			server: "https://arcgisonline.com",
			// tokenServiceUrl: "https://sampleserver6.arcgisonline.com/arcgis/tokens/",
			tokenServiceUrl: "https://arcgisonline.com/arcgis/tokens/",
			// adminTokenServiceUrl: "https://sampleserver6.arcgisonline.com/arcgis/admin/generateToken",
			adminTokenServiceUrl: "https://arcgisonline.com/arcgis/admin/generateToken",
			shortLivedTokenValidity: 60,
			currentVersion: 10.41,
			hasServer: true
		}],
		oAuthInfos: [{"tokenServicesUrl":"https://www.arcgis.com/sharing/rest/generateToken","isTokenBasedSecurity":true}],
		credentials: [{
			userId: "DArcadian",
			// server: "https://sampleserver6.arcgisonline.com/arcgis",
			server: "https://arcgisonline.com",
			token: tokenInfo.token,
			expires: tokenInfo.expires,
			validity: 60,
			isAdmin: false,
			ssl: false,
			//Calculate when the token was created by subtracting 60 minutes from the expiration time
			creationTime: tokenInfo.expires - (60000 * 60),
			scope: "server",
			resources: [
				// securedService
			]
		}]
	};
  let tokenprops = {
    server : 'https://www.arcgis.com/sharing/rest',
    token : this.agoToken
  }
	//Initialize the IdentityManager with the credentials object created above
	// this.esriId.initialize(credentialsJSON);
  this.esriId.registerToken(tokenprops);
	//Now that the token is registered with the IdentityManager the securred layer can be added to the map
	//addSecureLayer();
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
