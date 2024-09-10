import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  title: string="Latest Analytics";
  constructor(private titlesrv:TitleService){
    this.titlesrv.setTitle(this.title);

  }
  ngOnInit(): void {
  }

}
