import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AgoserviceProvider} from '../../providers/agoservice/agoservice';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private items : any;
  private adrs : any;
  private isHome : boolean = true;
  private agoToken : string;
  private agoExpiry : string;
  private snip : string;

  constructor(public navCtrl: NavController, private itemsProvider : AgoserviceProvider) {
    this.isHome = true;
  }

  async login(){
    let lg = await this.itemsProvider.auth().subscribe(
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
    )

  }
  loadItems(){
    console.log('loadItems called');
    let items = this.itemsProvider.loadItems().subscribe(
      data => {
        let d : any = data;
        this.items = [d];
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading items')
    )
  }

  loadItemsRest(){
    console.log('loadItemsRest called');
    let items = this.itemsProvider.loadItemsRest().subscribe(
      data => {
        let d : any = data;
        this.snip = d.snippet;
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading items')
    )
  }
  loadAddress() {
    let address = this.itemsProvider.loadAddress().subscribe(
      data => {
        let d : any = data;
        this.adrs = d.address.Address;
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading address')
    )
  }

  loadMap() {
    this.itemsProvider.loadMap();
  }
  query() {
    this.itemsProvider.query().subscribe(
      data => {
        let d : any = data;
        this.items = d.results;
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading items')
    );
  }

}
