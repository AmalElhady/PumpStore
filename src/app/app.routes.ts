import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DetailsComponent } from './details/details.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { CreateAccessoryComponent } from './create-accessory/create-accessory.component';
import { UpdateAccessoryComponent } from './update-accessory/update-accessory.component';
import { DeleteAccessoryComponent } from './delete-accessory/delete-accessory.component';
import { CreateProductComponent } from './create-product/create-product.component';







export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "contactus", component: ContactusComponent },
    { path: "pumps", component: PumpsComponent ,canActivate: [AuthGuard]},
    { path: "aboutus", component: AboutusComponent },
    { path: "details/:id", component: DetailsComponent },
    { path: "login", component: LoginComponent },
    { path: "accessories", component: AccessoriesComponent ,canActivate: [AuthGuard]},
    { path: "home", component: HomeComponent },
    { path: 'create', component: CreateProductComponent },
    { path: 'update-pump/:id', component: UpdateProductComponent },
    { path: 'delete-pump/:id', component: DeleteProductComponent },
    { path: 'delete-accessory/:id', component: DeleteAccessoryComponent },
    { path: 'update-accessory/:id', component: UpdateAccessoryComponent },
    { path: 'create-accessory', component: CreateAccessoryComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route

];
