import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';
/*
Esto de APP_BASE_HREF lo require cuando se pasa a desarrollo local
hay que añadirlo también en providers
*/
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { Grafico01Component } from './grafico01/grafico01.component';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { Grafico02Component } from './grafico02/grafico02.component';


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, HighchartsChartModule],
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent, MessagesComponent, Grafico01Component, ComunidadComponent, ProvinciasComponent, MunicipiosComponent, Grafico02Component],
  bootstrap: [AppComponent],
  providers: [HeroService, MessageService, { provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppModule { }
