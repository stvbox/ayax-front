import { Department } from './department';
import { ListFilter } from './realtors-list/realtors-list.component';
import { Realtor } from './realtor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { RequestOptions } from '../../node_modules/@angular/http/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Promise } from 'q';
import { promise } from 'selenium-webdriver';

class RealtorsListResult {
  data: Array<Realtor>;
}

class DepartmentsListResult {
  data: Array<Department>;
}

@Injectable()
export class DataStoreService {
  urlRealtors = 'http://localhost:53192/api/Realtors';
  urlDepartments = 'http://localhost:53192/api/Departments';

  departments: Array<Department>;

  headers: Headers;
  options: RequestOptions;

  constructor(private http: HttpClient) {}

  getRealtorByID(rltId: number): Observable<Realtor> {
    const url = this.urlRealtors  + '/' +  rltId;
    return this.http.get(url).map(res => res['data']);
  }

  getDepartmentById(depId: number) {
    console.log('getDepartmentById: ' + depId);

    for (let i = 0; i < this.departments.length; i++ ) {
      const dep = this.departments[i];
      if (dep.id == depId) {
        return dep;
      }
    }

    return null;
  }

  getDepartments(): Observable<Array<Department>> {
    return this.http.get<Array<Department>>(this.urlDepartments).map(res => res['data']);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return null;
    /*console.error('An error occurred', error);
    return Promise.reject(error.message || error);*/
  }

  public delItem(id: number) {
    const url = this.urlRealtors + '/' + id;
    return this.http.delete(url).map(res => res).toPromise();
  }

  saveRealtor(rlt: Realtor) {
    const body = {
      id: rlt.id,
      Name: rlt.name,
      Surname: rlt.surname,
      DepId: rlt.depId
    };

    const formData: FormData = new FormData();
    formData.append('id', String(rlt.id));
    formData.append('Name', String(rlt.name));
    formData.append('Surname', String(rlt.surname));
    formData.append('DepId', String(rlt.depId));

    console.log('formData: ' + JSON.stringify(body));

    return this.http.post(this.urlRealtors, formData).map(res => res).toPromise();
  }

  getRealtors(filter: ListFilter, pageNum: number, pageSize: string, callback) {
    const that = this;

    console.log('pageSize:' + pageSize);
    console.log(JSON.stringify(filter));

    let httpParams = new HttpParams();
    httpParams = httpParams.append('page', String(pageNum));
    httpParams = httpParams.append('size', String(pageSize));

    if (filter.surname && filter.surname.length > 0) {
      httpParams = httpParams.append('fsm', filter.surname);
    }

    if (filter.drange !== undefined) {
      const dateFr = String(new Date(filter.drange[0]).getTime());
      const dateTo = String(new Date(filter.drange[1]).getTime());
      httpParams = httpParams.append('datefr', dateFr);
      httpParams = httpParams.append('dateto', dateTo);
    }

    this.http.get<DepartmentsListResult>(this.urlDepartments).subscribe(depsResponse => {
      that.departments = depsResponse['data'];

      const nullDep = new Department();
      nullDep.id = 0;
      nullDep.name = 'Подраздение не указано';
      that.departments.push();

      this.http.get<RealtorsListResult>(this.urlRealtors, { params: httpParams }).subscribe(response => {
        response['data'].forEach(realtor => {
          realtor.Department = this.getDepartmentById(realtor['depId']);
        });

        console.log(JSON.stringify(response['data']));

        callback(response['data'], response['nav']);
      });
    });

  }

}
