import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the AddItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-item/add-item.html',
})
export class AddItemPage {

  private title = "";
  private description = "";

  constructor(private navCtrl: NavController, private view: ViewController) {

  }

  saveItem() {
    let newItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }

}
