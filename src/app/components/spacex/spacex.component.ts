import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../../services/spacex.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spacex',
  templateUrl: './spacex.component.html',
  styleUrls: ['./spacex.component.css']
})
export class SpacexComponent implements OnInit {

  data: any;
  loader: boolean = true;
  endPoint: string = "";

  constructor(private spacexService: SpacexService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.GetAllSpaceXLaunches1();
  }

  GetAllSpaceXLaunches(endPoint: any) {
    this.spacexService.getAllLaunch(endPoint)
      .subscribe((response) => {
        this.data = response;
        this.loader = false;
      });
  }

  GetAllSpaceXLaunches1() {
    this.router.events
      .subscribe(e => {
        if (e.constructor.name === 'NavigationEnd' && this.router.navigated) {
          this.loader = true;
          this.route.queryParams
            .subscribe(params => {
              this.endPoint = "";
              this.endPoint = "https://api.spaceXdata.com/v3/launches?limit=100";
              let launch_success = params.launch_success;
              let launch_year = params.launch_year;
              let land_success = params.land_success;
              if (launch_success && launch_success != '') {
                this.endPoint += '&launch_success=' + launch_success;
              }
              if (launch_year && launch_year != '') {
                this.endPoint += '&launch_year=' + launch_year;
              }
              if (land_success && land_success != '') {
                this.endPoint += '&land_success=' + land_success;
              }
              this.GetAllSpaceXLaunches(this.endPoint);
            }).unsubscribe();
        }
      });
  }

}
