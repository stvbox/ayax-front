import { DataStoreService } from './../data-store.service';
import { Realtor } from './../realtor';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

export class ListFilter {
  surname: string;
  drange: string;
}

@Component({
  selector: 'app-realtors-list',
  templateUrl: './realtors-list.component.html',
  styleUrls: ['./realtors-list.component.css']
})
export class RealtorsListComponent implements OnInit {
  ds: DataStoreService = null;
  listPageSize = '10';
  listPageNum = 1;
  fullSize = 0;
  pagesCount = 1;
  pages = new Array();
  pageSizes = ['10', '15', '30', '50'];

  locale = 'ru';
  realtors: Array<Realtor> = new Array<Realtor>();
  filter: ListFilter = new ListFilter();

  drange: string;
  surname: string;

  constructor(ds: DataStoreService, private _localeService: BsLocaleService, private router: Router) {
    this._localeService.use(this.locale);
    this.ds = ds;
    this.reloadListItems();
  }

  reloadListItems(): void {
    this.filter.surname = this.surname;
    this.filter.drange = this.drange;

    this.ds.getRealtors(this.filter, this.listPageNum, this.listPageSize, (realtors, nav) => {
      this.fullSize = nav['fullSize'];
      this.pagesCount = nav['pagesCount'];
      this.realtors = realtors;

      this.pages = new Array();
      for (let i = 0; i < this.pagesCount; i ++) {
        this.pages.push(i + 1);
      }
      console.log('this.pagesCount: ' + this.pagesCount);
    });
  }

  setPage(page: number) {
    if (!(page > this.pagesCount || page < 1)) {
      this.listPageNum = page;
    }
    this.reloadListItems();
  }

  onChange(pageSize) {
    this.listPageSize = pageSize;
    this.setPage(1);
  }

  openDetail(id: number) {
    console.log(id);
    this.router.navigate(['/realtor/' + String(id)]);
  }

  ngOnInit() {
  }

}
