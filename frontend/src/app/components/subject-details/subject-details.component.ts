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

  closeSidebar() {
    this.subject = null;
  }
  
}