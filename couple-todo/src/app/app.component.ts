import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskService } from './services/task.service'; // Import the service
import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  constructor(private taskService: TaskService) {}
  title = 'couple-todo';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin], // Add this line!
    initialView: 'dayGridMonth',                 // Ensure this matches the plugin
    dateClick: (info) => this.handleDateClick(info),
    buttonText: { today: 'Today' },
    events: this.getTaskEvents(), // FullCalendar will automatically put a dot/bar on these days
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    eventColor: '#4ecdc4', 
  };

  refreshCalendarEvents() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEventSources();
    calendarApi.addEventSource(this.getTaskEvents());
  }

  ngOnInit() {
    this.taskService.tasksUpdated$.subscribe(() => {
      if (this.calendarComponent) {
        this.refreshCalendarEvents();
      }
    });
  }

  getTaskEvents() {
    // Use the new public method instead of 'this.taskService.tasks'
    return this.taskService.getTasksSnapshot().map(task => ({
      title: '•', 
      date: task.date,
      display: 'background',
      color: this.taskService.getCategoryColor(task.category) // Dynamic colors!
    }));
  }

  handleDateClick(arg: any) {
    this.taskService.setSelectedDate(arg.dateStr);
  }
}
