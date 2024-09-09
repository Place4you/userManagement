import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, AlertsComponent ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

}
