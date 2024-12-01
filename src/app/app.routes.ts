import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DetailsComponent } from './details/details.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { LoginComponent } from './account/login/login.component';




export const routes: Routes = [
    { path: "contactus", component: ContactusComponent },
    { path: "pumps", component: PumpsComponent },
    { path: "aboutus", component: AboutusComponent },
    { path: "details/:id", component: DetailsComponent },
    {path:"login", component: LoginComponent},
    { path: "accessories", component: AccessoriesComponent },
];
