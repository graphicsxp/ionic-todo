import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  private items : any;
  shouldShowDelete: boolean = true;
  
  ngOnInit() {
    this.dataService.getData().then((todos) => {
        if (todos){
          this.items = todos;
        }
    });
  }

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private dataService: Data) {

    // this.items = [
    //   { title: 'hi1', description: 'test1' },
    //   { title: 'hi2', description: 'test2' },
    //   { title: 'hi3', description: 'test3' },
    // ];

    this.dataService.getData().then(items => this.items = items);

  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  saveItem(item) {
    this.dataService.save(item).then(res => {
      this.items.push(res);
    });
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, { item: item });
  }

  removeItem(item){
    this.dataService.delete(item).then(res => {
      this.items.splice(this.items.indexOf(item), 1);
    });
  }
}
