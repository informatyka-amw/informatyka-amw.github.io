// src/app/app.component.ts
import { Component } from '@angular/core';
import { Subject, Semester } from './models/subject.model';
import { DataService } from './services/data.service';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  selectedSemester: number | null = null;  // Numer aktywnego semestru
  hoveredSemester: number | null = null;

  constructor(private dataService: DataService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataService.getSemesters().subscribe((data) => {
      console.log('Załadowane dane semestrów:', data); // ✅ SPRAWDZAMY DANE
      this.semesters = data;
      this.selectedSemester = 0;
    });
  }

  onSubjectSelected(subject: Subject) {
    if (this.selectedSubject === subject) {
      // Jeśli klikniesz ten sam przedmiot, zamknij szczegóły
      this.selectedSubject = null; 
    } else {
      // Jeśli klikniesz inny przedmiot, otwórz szczegóły
      this.selectedSubject = subject;
    }

    // Wymuszenie detekcji zmian w Angularze
    this.cdRef.detectChanges();
  }

  onSemesterClick(semesterIndex: number) {
    this.selectedSemester = semesterIndex;
    this.selectedSubject = null; // Resetujemy wybrany przedmiot
    console.log('Wybrany semestr:', semesterIndex);
    console.log('Moduły semestru:', this.semesters[semesterIndex]?.modules);
  }

  // Funkcja zwraca moduły w danym semestrze
  getModulesForSemester(semesterIndex: number) {
    return this.semesters[semesterIndex]?.modules || [];  // Zwróci pustą tablicę, jeśli 'modules' są undefined
  }

  // Funkcja zmieniająca kolor semestru na hover
  onMouseEnter(semesterIndex: number) {
    this.hoveredSemester = semesterIndex;
  }

  onMouseLeave() {
    this.hoveredSemester = null;
  }
}
