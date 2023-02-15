import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { SharedModule } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { UsuarioModule } from './usuario/usuario.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PessoaModule,
    SharedModule,
    NgbModule,
    AuthModule,
    HttpClientModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
