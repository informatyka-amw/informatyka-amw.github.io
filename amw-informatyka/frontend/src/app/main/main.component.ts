import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterComponent } from '../components/semester/semester.component';
import { CourseComponent } from '../components/course/course.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SemesterComponent, CourseComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  copyLink() {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href; 
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy'); 
    document.body.removeChild(tempInput); 
    alert('Link skopiowany do schowka!');
  }

  constructor() {
    window.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.matches('.share-button')) {
        this.dropdownOpen = false;
      }
    });
  }
}
