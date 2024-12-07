import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DetailsComponent } from './details/details.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './services/auth-guard.service';




export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "contactus", component: ContactusComponent },
    { path: "pumps", component: PumpsComponent ,canActivate: [AuthGuard]},
    { path: "aboutus", component: AboutusComponent },
    { path: "details/:id", component: DetailsComponent },
    { path: "login", component: LoginComponent },
    { path: "accessories", component: AccessoriesComponent ,canActivate: [AuthGuard]},
    { path: "home", component: HomeComponent },
     
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route

];
