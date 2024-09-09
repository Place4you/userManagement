import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AddUserComponent } from './pages/user-management/add-user/add-user.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'signup',
        component: SignupComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component: DashboardComponent
            },
            {
                path:'',
                component:UserManagementComponent,
                children:[
                    {
                        path:'user-list',
                        component: UserListComponent
                    },
                    {
                        path:'add-user',
                        component: AddUserComponent
                    },
                ]
            },
            


        ]
    },
    
];
