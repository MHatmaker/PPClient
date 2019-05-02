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

  constructor(public navCtrl: NavController, private itemsProvider : AgoserviceProvider) {
    this.isHome = true;
  }

  login(){
    let lg = this.itemsProvider.auth().subscribe(
      data => {
        let d : any = data;
        this.items = d.results;
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading items')
    )
    console.log(lg);
  }
  loadItems(){
    console.log('loadItems called');
    let items = this.itemsProvider.loadItems().subscribe(
      data => {
        let d : any = data;
        this.items = d.results;
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

}
