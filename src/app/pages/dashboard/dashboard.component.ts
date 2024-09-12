import { AlertSrvService } from './../../services/alert-srv.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AlertsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  title: string="Latest Analytics";
  constructor(private titlesrv:TitleService, private alertService: AlertSrvService){

  }
  ngOnInit(): void {
    this.titlesrv.setTitle(this.title);
    console.log(this.title);
    

  }

  ngOnDestroy(): void {
    this.alertService.clear();
  }

}
