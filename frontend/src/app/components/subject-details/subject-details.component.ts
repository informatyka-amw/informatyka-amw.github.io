// src/app/subject-details/subject-details.component.ts
import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Subject } from '../../models/subject.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnChanges {
  @Input() subject: Subject | null = null;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['subject'] && changes['subject'].currentValue) {
      console.log("Załadowano przedmiot:", this.subject);
    }

  }

  getTotalContactHours(): number {
    if (!this.subject || !this.subject.contact_hours) {
      return 0; 
    }

    const { contact_hours } = this.subject;
    const lecture = contact_hours?.lecture || 0;
    const exercises = contact_hours?.exercises || 0;
    const labs = contact_hours?.labs || 0;
    const seminars = contact_hours?.seminars || 0;
    
    return lecture + exercises + labs + seminars;
  }

  closeSidebar() {
    this.subject = null;
  }
  
}