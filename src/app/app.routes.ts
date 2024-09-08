import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
                path:'user-list',
                component:UserListComponent
            },
            {
                path:'create-user',
                component: CreateUserComponent
            },


        ]
    },
    
];
