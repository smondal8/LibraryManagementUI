import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryListComponent } from './Library-list/Library-list.component';
import { getLibrarydetailsService } from './libraryManagementService.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationBookComponent } from './Books-Registration/book-registration.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '../app/auth/authGuard';
import { AuthServiceService } from '../app/auth/auth-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LibraryListComponent,    
    RegistrationBookComponent, BookDetailsComponent, AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [getLibrarydetailsService,AuthGuard,AuthServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
