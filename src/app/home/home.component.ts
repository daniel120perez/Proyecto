import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/Worker';
import { WorkerService } from '../Services/worker.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //private workerSVC: WorkerService
  constructor(private workerSVC: WorkerService) { }

  flag:boolean;
  Key:any;
  account:Account;
  user:boolean;

  worker: Worker;
  auxWorker: Worker;
  toEdit: Worker;
  request: Worker[];

  newWorker = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
  });

  detailWorker = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
  });




  ngOnInit(): void {
    this.tabla_workers();
    this.getUser();
  }

  tabla_workers() {
    this.workerSVC.GET().subscribe(data => (this.request = data));
  }

  async PostWorker() {

    this.worker = {} = await this.newWorker.value;
    this.workerSVC.POST(this.worker).subscribe(data => { });
    this.worker.id = null;
    this.worker.name = '';
    this.worker.age = '';
    this.worker.email = '';
    window.location.reload();
  }

  async DeleteWorker(id) {
    await this.workerSVC.DELETE(id).subscribe(data => {
      window.location.reload()
    });
  }

  loadWorker(aux: Worker) {
    this.auxWorker = Object.assign({}, aux);
  }

  async EditWorker() {

    this.toEdit = {} = await this.detailWorker.value;
    this.workerSVC.PUT(this.toEdit, this.auxWorker.id).subscribe(data => {
      console.log(data);
      window.location.reload();
      this.toEdit.id = null;
      this.toEdit.name = '';
      this.toEdit.age = '';
      this.toEdit.email = '';

      this.auxWorker.id = null;
      this.auxWorker.name = '';
      this.auxWorker.age = '';
      this.auxWorker.email = '';
    })
    //this.workerSVC.PUT(Object,'')
  }

  getUser(){
    let token = localStorage.getItem('Account_Private_Key');
    let user = JSON.parse(localStorage.getItem('User_Private_Account'));
    if (user && token) {
      this.flag = true;
      this.account = user;
      this.Key = token;
      this.user = true;
    }else{
      this.flag = false;
    }
  }

}
