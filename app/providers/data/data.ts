import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  private storage;
  private data;

  constructor(private http: Http) {
    this.data = null;
    this.storage = new Storage(SqlStorage, { name: 'todo' });
  }

  getData() {
    //return this.storage.get('todos');
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/todos')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  save(review) {
    // let newData = JSON.stringify(data);
    // this.storage.set('todos', newData);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {

      this.http.post('http://localhost:8080/api/todos', JSON.stringify(review), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        });
    });
  }

  delete(data) {
    //this.storage.query('delete from todos where title = ' + data.title)
    return new Promise(resolve => {
      this.http.delete('http://localhost:8080/api/todos/' + data._id).subscribe((res) => {
        console.log(res.json());
        resolve();
      })
    });
  }
}