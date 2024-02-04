import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule} from 'primeng/toast'

import { HomeComponent } from './modules/page/home/home.component';
import { TaskCompleteComponent } from './modules/components/task-complete/task-complete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    BrowserAnimationsModule,
    BrowserModule

  ],
  providers: [PrimeIcons, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
