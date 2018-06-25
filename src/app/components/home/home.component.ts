import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { HomePageService } from '../../services/home-page.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomePageService]
})
export class HomeComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  ListImageItem: any;
  ListService: any;
  ListProvince: any;
  ListDistrictSender: any;
  ListDistrictReceiver: any;
  ListCountry: any;
  ListFee: any;

  sender_district: number = '';
  sender_province: number = '';
  receiver_district: number = '';
  receiver_province: number = '';
  receiver_country: string = '';
  product_type: string = '';
  product_weight: number;
  money_collection: number;
  type: number;
  constructor( private homePageService: HomePageService) { }

  ngOnInit() {
    this.ListImageItem = [{'img_src': 'bgSlide1.png'}, { 'img_src' : 'bgSlide2.png'}];
    this.sender_province = '';
    this.ListService = [
        { 'service_name': 'Dịch vụ hỏa tốc', 'service_url': '', 'class': 'hvr-sweep-to-left'  },
        { 'service_name': 'Chuyển liên tỉnh', 'service_url': '','class': 'hvr-sweep-to-top'   },
        { 'service_name': 'Dịch vụ chuyển phát quốc tế', 'service_url': '', 'class': 'hvr-sweep-to-bottom'  },
        { 'service_name': 'Dịch vụ phát hàng thu tiền (COD)', 'service_url': '', 'class': 'hvr-sweep-to-right'  }
    ];

    this.homePageService.getProvinceList().subscribe( (res) => {
        this.ListProvince = res;
    });

  }
    changeProducType(product_type){
        this.product_type = product_type;
    }

    changeProvinceSender(){
        if(this.sender_province > 0){
            this.homePageService.getDistrictInProvince(this.sender_province).subscribe( (res) => {
                this.ListDistrictSender = res;
            })
        }
        else {
            this.ListDistrictSender = [];
        }
    }

    changeProvinceReceiver(){
        if(this.receiver_province > 0) {
            this.homePageService.getDistrictInProvince(this.receiver_province).subscribe( (res) => {
                this.ListDistrictReceiver = res;
            })
        }
        else {
            this.ListDistrictReceiver = [];
        }
    }

    getAllPrice(){
        let obj = {
            "SENDER_PROVINCE": this.sender_province,
            "SENDER_DISTRICT": this.sender_district,
            "RECEIVER_PROVINCE": this.receiver_province,
            "RECEIVER_DISTRICT": this.receiver_district,
            "PRODUCT_TYPE": this.product_type,
            "PRODUCT_WEIGHT": this.product_weight,
            "PRODUCT_PRICE": this.money_collection,
            "MONEY_COLLECTION": this.money_collection,
            "TYPE": this.type
        }
        console.log(obj);
        this.homePageService.getAllPrice(obj).subscribe( (res) => {
            this.ListFee = res;
        })
    }

  onSave() {
    const img = this.fileUpload.imagePath;
    console.log(img);

  }


      // let t = [];
      // for (let i = 0; i < 3; i++) {
      //   let a: any = {};
      //   a.name = 1;
      //   a.x = [];
      //   for (let j = 0; j < 3; j++) {
      //     a.x.push(i+'-'+j);
      //   }
      //   t.push(a);
      // }
      // console.log(t);
      // let count = 1;
      // for (let i = 0; i < t.length; i++) {
      //   count = count + t[i].x.length;
      // }
      // let tmp = [];
      // debugger;
      // for (let i = 0; i < t.length; i++) {
      //   if (tmp.length <= 0) {
      //     for (let j = 0; j < t[i].x.length; j++) {
      //       tmp.push(t[i].x[j]);
      //     }
      //   } else {
      //     let tmp1 = JSON.parse(JSON.stringify(tmp));
      //     let tmp2 = [];
      //     for (let j = 0; j < t[i].x.length; j++) {
      //       let l = tmp1.length;
      //       for (let k = 0; k < l; k++) {
      //         let item = tmp1[k];
      //         item = item + '  ' + t[i].x[j];
      //         tmp2.push(item);
      //       }
      //     }
      //     tmp = tmp2;
      //   }
      //
      // }
      // console.log(tmp);

}
