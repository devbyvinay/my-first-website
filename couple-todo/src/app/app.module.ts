import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // 1. Import it
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilterByDatePipe } from './todo/filter-by-date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FilterByDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FullCalendarModule, 
    MatDialogModule,    
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
