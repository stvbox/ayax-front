import { Realtor } from './../realtor';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectComponent } from 'ng2-select';
import { error } from 'util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-realtors-detail',
  templateUrl: './realtors-detail.component.html',
  styleUrls: ['./realtors-detail.component.css']
})
export class RealtorsDetailComponent implements OnInit {
  public item: Realtor;
  public items = [{id: '1', text: 'test'}];
  public activeDeps = [];
  _ds: DataStoreService;

  @ViewChild('chosenuser') public ngSelect: SelectComponent;

  constructor(ds: DataStoreService,  private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {
    this._ds = ds;
  }

  private value: any = {};
  private _disabledV = '0';
  private disabled = false;

  modalRef: BsModalRef;
  message: string;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.item.depId = Number(value.id);
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
    this.item.depId = 0;
  }

  public typed(value: any): void {
    console.log('New search input: ', value);

  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  ngOnInit() {
    this.items = new Array();

    this._ds.getDepartments().subscribe(departments => {

      for (let i = 0; i < departments.length; i++) {
        const dep = departments[i];
        const depOpt = {id: String(dep.id), text: dep.name};
        this.items.push(depOpt);
        this.activeDeps.push(depOpt);
      }


      this.route.params.subscribe(params => {

        if (params['id'] == 0) {
          this.item = new Realtor();
        }

        this._ds.getRealtorByID(params['id']).subscribe(realtor => {
          this.item = realtor;

          for (let i = 0; i < this.items.length; i++){
            const depOpt = this.items[i];
            if (depOpt.id == String(this.item.depId)) {
              this.activeDeps = [depOpt];
            }
          }

          console.log(JSON.stringify(this.item));
      });
     });

    });
  }

  public saveItem() {
    this._ds.saveRealtor(this.item).then(res => {
      console.log(JSON.stringify(res));
      this.router.navigate(['/realtor']);
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }

  public delItem(id: number) {
    /*this._ds.delItem(id);*/
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this._ds.delItem(this.item.id);
    this.router.navigate(['/realtor']);
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
