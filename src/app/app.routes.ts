import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PumpsComponent } from './pumps/pumps.component';


export const routes: Routes = [
    { path: "contactus", component: ContactusComponent },
    { path: "pumps", component: PumpsComponent },

];
