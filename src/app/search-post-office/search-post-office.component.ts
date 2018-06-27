import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { HomePageService } from '../services/home-page.service';
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-search-post-office',
  templateUrl: './search-post-office.component.html',
  styleUrls: ['./search-post-office.component.css'],
  providers: [HomePageService]
})
export class SearchPostOfficeComponent implements OnInit {

    province: number = -1;
    district: number = -1;
    ListDistrict: any;
    ListProvince: any;
    ListPostOffice: any;
    markerList: any = [];
    indexMarker: number;

    @ViewChild('map') mapElement: any;
    constructor( private homePageService:  HomePageService) { }

    ngOnInit() {
        this.ListPostOffice= null;
        this.homePageService.getProvinceList().subscribe( (res) => {
            this.ListProvince = res;
        });

        let myLatLng = new google.maps.LatLng(21.0000361, 105.77722616);

        let image = {
            url: '/assets/images/marker.jpg',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(37, 50),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 50)
        };

        let shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        let map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 15,
            center: myLatLng
        });

        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image,
            shape: shape,
            title: "TCT CP Bưu chính Viettel",
            zIndex: 15
        });

        let htmlRaw = '<div>'
                + '<h4>' + 'Tổng Công ty Cổ phần Bưu chính Viettel' + '</h4>'
                + '<p>' + 'Số 10 ĐCT08, Mễ Trì, Từ Liêm, Hà Nội, Việt Nam' + '</p>'
                + '<p>' + 'Hotline : 19008095' + '</p>'
                + '</div>'
        let infowindow = new google.maps.InfoWindow({
            content: htmlRaw
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
            // console.log('show marker');
        });
    }

    changeProvince(){
        if(this.province > 0){
            this.homePageService.getDistrictInProvince(this.province).subscribe( (res) => {
                this.ListDistrict  =  res;
            })
        }
        else {
            this.ListDistrict = [];
        }
    }

    searchPostOffice(){
        this.markerList = [];
        let thisRef = this;
        this.homePageService.getListPostOffice(this.province, this.district).subscribe( (res) => {
            if(!res.error){
                this.ListPostOffice = res;

                let myLatLng = {lat: Number(res[0].LATITUDE), lng: Number(res[0].LONGITUDE)};

                let map = new google.maps.Map(this.mapElement.nativeElement, {
                    zoom: 15,
                    center: myLatLng
                });

                this.setMarkers(map);

                let markerMap = {};

                // function setMarkers(map) {
                //     let image = {
                //         url: '/assets/images/marker.jpg',
                //         // This marker is 20 pixels wide by 32 pixels high.
                //         size: new google.maps.Size(37, 50),
                //         // The origin for this image is (0, 0).
                //         origin: new google.maps.Point(0, 0),
                //         // The anchor for this image is the base of the flagpole at (0, 32).
                //         anchor: new google.maps.Point(0, 50)
                //     };
                //
                //     let shape = {
                //         coords: [1, 1, 1, 20, 18, 20, 18, 1],
                //         type: 'poly'
                //     };
                //
                //     for (let i = 0; i < res.length; i++) {
                //         let post_office = res[i];
                //         let marker = new google.maps.Marker({
                //             position: {lat: Number(post_office.LATITUDE), lng: Number(post_office.LONGITUDE)},
                //             map: map,
                //             icon: image,
                //             shape: shape,
                //             title: post_office.NAME + ' - ' + post_office.ADDRESS,
                //             zIndex: 10
                //         });
                //         let htmlRaw = '<div class="" id="' + i + '">'
                //                 + '<h4>' + post_office.NAME + '</h4>'
                //                 + '<p>' + post_office.ADDRESS + '</p>'
                //                 + '<p> Phone : ' +   post_office.PHONE + '</p>'
                //                 + '<p> Phụ trách : ' + post_office.PHUTRACH + ' - Điện thoại : 0'+ post_office.PHUTRACHPHONE.substring(2) + '</p>'
                //                 + '</div>'
                //         let infowindow = new google.maps.InfoWindow({
                //             content: htmlRaw
                //         });
                //
                //         marker.addListener('click', function() {
                //             infowindow.open(map, marker);
                //             // console.log('show marker');
                //         });
                //
                //         marker.addListener('close', function() {
                //             infowindow.close(map, marker);
                //             // console.log('show marker');
                //         });
                //
                //         thisRef.markerList.push(marker);
                //     }
                //
                // }

            }
        })
    }

    setMarkers(map) {
        let thisRef = this;
        let image = {
            url: '/assets/images/marker.jpg',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(37, 50),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 50)
        };

        let shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        for (let i = 0; i < this.ListPostOffice.length; i++) {
            let post_office = this.ListPostOffice[i];
            let marker = new google.maps.Marker({
                position: {lat: Number(post_office.LATITUDE), lng: Number(post_office.LONGITUDE)},
                map: map,
                icon: image,
                shape: shape,
                title: post_office.NAME + ' - ' + post_office.ADDRESS,
                zIndex: 10
            });
            let htmlRaw = '<div class="" id="' + i + '">'
                    + '<h4>' + post_office.NAME + '</h4>'
                    + '<p>' + post_office.ADDRESS + '</p>'
                    + '<p> Phone : ' +   post_office.PHONE + '</p>'
                    + '<p> Phụ trách : ' + post_office.PHUTRACH + ' - Điện thoại : 0'+ post_office.PHUTRACHPHONE.substring(2) + '</p>'
                    + '</div>'
            let infowindow = new google.maps.InfoWindow({
                content: htmlRaw
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
                // console.log('show marker');
            });

            marker.addListener('close', function() {
                infowindow.close(map, marker);
                // console.log('show marker');
            });

            this.markerList.push(marker);
        }

    }

    triggerMapMarker(index: number){
        google.maps.event.trigger(this.markerList[this.indexMarker], 'close');
        this.indexMarker = index;
        google.maps.event.trigger(this.markerList[index], 'click');
    }

}
