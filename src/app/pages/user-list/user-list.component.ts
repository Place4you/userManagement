import { IDepartment } from './../../core/Interface/IDepartment';
import { ApiServiceService } from './../../services/api-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Constant } from '../../core/Constant';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  update: boolean = false;

  url:string = '';

  deptInfo: IDepartment [] = [];
  dept: any[]=[];
  departmentId: number= 0;
  departmentLogo = '';
  departmentName = '';
  // Form properties


// service for department
  constructor(private apisrc: ApiServiceService){}

  http = inject(HttpClient);

  ngOnInit() {
    this.getDepartment();
  }



    
// Fetch Department data
  getDepartment() {
    this.loading = true;

    this.apisrc.getallapi(Constant.GET_DEPT).subscribe(
      (res:any) => {
        this.deptInfo = res.data;
        this.errorMessage = null;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = "Failed to fetch data. Please try again later.";
        this.loading = false;
      }
    );
  }





}
