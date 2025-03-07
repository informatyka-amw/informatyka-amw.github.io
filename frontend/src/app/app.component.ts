
import { Component } from '@angular/core';
import { Subject, Semester } from './models/model.model';
import { DataService } from './services/data.service';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AppConfig } from './models/model.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimelineComponent, SubjectDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  semesters: Semester[] = [];
  selectedSubject: Subject | null = null;
  selectedSemester: number | null = null;  
  hoveredSemester: number | null = null;
  appConfig: AppConfig = { title: '', subtitle: '' };

  constructor(private dataService: DataService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataService.getAppConfig().subscribe((config) => {
      this.appConfig = config;
    });
  
    this.dataService.getSemesters().subscribe((data) => {
      this.semesters = data;
      this.selectedSemester = 0;
    });
  }
  

  onSubjectSelected(subject: Subject) {
      this.selectedSubject = null; 
      this.cdRef.detectChanges();
    
      setTimeout(() => {
        this.selectedSubject = subject;
        this.cdRef.detectChanges();
      }, 0);
    
  }

  onSemesterClick(semesterIndex: number) {
    this.selectedSemester = semesterIndex;
    this.selectedSubject = null;
  }

  
  getModulesForSemester(semesterIndex: number) {
    return this.semesters[semesterIndex]?.modules || [];    }

 
  onMouseEnter(semesterIndex: number) {
    this.hoveredSemester = semesterIndex;
  }

  onMouseLeave() {
    this.hoveredSemester = null;
  }


  
}
