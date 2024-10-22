import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';

interface Subject {
  title: string;
  nodeId: string; 
}

@Component({
  selector: 'app-semester',
  standalone: true,
  imports: [CommonModule, CourseComponent],
  templateUrl: './semester.component.html',
  styleUrl: './semester.component.scss'
})
export class SemesterComponent {
  @Input() semesterTitle: string = '1';
  

  constructor() {
    
  }
}
