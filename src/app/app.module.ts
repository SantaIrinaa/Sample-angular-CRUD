import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { DeleteClientComponent } from './components/delete-client/delete-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/clients', pathMatch: 'full'},
      {path: 'clients', component: ClientComponent},
      {path: 'add-client', component: AddClientComponent},
      {path: 'edit-client/:id', component: EditClientComponent},
      {path: 'delete-client/:id', component: DeleteClientComponent}
    ])
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
