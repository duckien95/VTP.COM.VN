import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class HomePageService {

    constructor(private httpClient: HttpClientService, private  http: Http) { }

    setHeader(){
        let header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
        header.append('Access-Control-Allow-Headers', 'Content-type');
        // header.append('Access-Control-Allow-Origin', '*');
        // // header.append("Access-Control-Allow-Credentials", "true");
        // header.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        // header.append("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Access-Control-Allow-Origin");
        return header;
    }

    getProvinceList(){
        let header: Headers = this.setHeader();
        return this.http.get('https://api.viettelpost.vn/api/setting/listallprovince', {headers: header}).map(data => {
            let result = JSON.parse(data["_body"]);
            return result;
        });
    }

    getCountryList(){
        let header: Headers = this.setHeader();
        return this.http.get('https://api.viettelpost.vn/api/setting/listallnational', {headers: header}).map(data => {
            let result = JSON.parse(data["_body"]);
            return result;
        });
    }



    getDistrictInProvince(province_id){
        let header: Headers = this.setHeader();
        return this.http.get('https://api.viettelpost.vn/api/setting/listdistrictbyprovince/' + province_id, {headers: header}).map(data => {
            let result = JSON.parse(data["_body"]);
            return result;
        })
    }

    getAllPrice(obj){
        let header: Headers = this.setHeader();
        header.append('Content-Type', 'application/json');
        return this.http.post('https://api.viettelpost.vn/api/tmdt/getPriceAll', obj, { headers: header}).map(data => {
            let result = JSON.parse(data["_body"]);
            return result;

        })
    }

    getOrderJourney(order_number) {
        let header: Headers =  this.setHeader();
        return this.http.get('https://api.viettelpost.vn/api/setting/tracking/?number='+ order_number).map( data => {
            let result = JSON.parse(data["_body"]);
            return result;

        }).catch( (error: any) => {
            // console.error(error);
            let errors = { error: true, message: 'Mã đơn hàng không tồn tại' };
             return Observable.of(errors);
        })
    }

    getListPostOffice(province_id, district_id){
        var params = '/' +  province_id + '/' + district_id;
        return this.http.get('https://api.viettelpost.vn/api/setting/listPostCode' + params).map( data => {
            let result = JSON.parse(data["_body"]);
            return result;

        }).catch( (error: any) => {
            console.error(error);
            let errors = { error: true, message: 'Không tìm thấy chi nhánh' };
             return Observable.of(errors);
        })
    }
}
