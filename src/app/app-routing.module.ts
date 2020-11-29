import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationBookComponent } from './Books-Registration/book-registration.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/authGuard';


const routes: Routes = [
  //{path: '', pathMatch: 'full',redirectTo: 'login'},
  {path: 'login',component: AuthComponent},
  {path: 'library', canActivate: [AuthGuard], component: RegistrationBookComponent},
  {path: 'books-details/:id', canActivate: [AuthGuard],component: BookDetailsComponent}
  //{path: "*", component: <>}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
