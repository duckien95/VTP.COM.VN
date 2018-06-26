import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { HomePageService } from '../services/home-page.service';

@Component({
    selector: 'app-check-order',
    templateUrl: './check-order.component.html',
    styleUrls: ['./check-order.component.css'],
    providers: [HomePageService]
})
export class CheckOrderComponent implements OnInit {

    order_code: string;
    OrderJourney: any;
    ListTracking: any;
    message: string;
    constructor(private activatedRoute: ActivatedRoute, private homePageService: HomePageService, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( params => {
            this.order_code = params.key;
            this.OrderJourney = null;
            this.ListTracking = null;
            this.homePageService.getOrderJourney(this.order_code).subscribe( (res) => {
                if(res.error){
                    this.message =  res.message;
                }
                else {
                    this.message = '';
                    this.OrderJourney = res;
                    this.ListTracking = res.listTrackingResponse;
                }
            })
        })
    }

    searchOrder(){
        this.router.navigate(['/tracking'], { queryParams: { 'key' : this.order_code } });
    }


}
