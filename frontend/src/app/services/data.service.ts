// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as yaml from 'js-yaml';
import { Semester, Module, Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private yamlUrl = './subjects.yaml'; 

  constructor(private http: HttpClient) {}

  getSemesters(): Observable<Semester[]> {
    return this.http.get(this.yamlUrl, { responseType: 'text' }).pipe(
      map((yamlText) => {
        const parsedData = yaml.load(yamlText) as { semesters: { [key: number]: { modules?: Module[] } } };

        return Object.keys(parsedData.semesters).map((key) => {
          const semesterData = parsedData.semesters[Number(key)];

          return {
            number: Number(key),
            modules: semesterData.modules?.map((module) => ({
              name: module.name || "Nieznany Moduł",
              subjects: module.subjects?.map((subject) => ({
                name: subject.name || "Nieznany Przedmiot",
                description: subject.description || "Brak opisu",
                lecturer: subject.lecturer || "Nieznany prowadzący",
                ects: subject.ects || 0,
                exam_type: subject.exam_type || "pass",
                contact_hours: subject.contact_hours
                  ? {
                      lecture: subject.contact_hours.lecture || 0,
                      exercises: subject.contact_hours.exercises || 0,
                      labs: subject.contact_hours.labs || 0,
                      seminars: subject.contact_hours.seminars || 0,
                    }
                  : {
                      lecture: 0,
                      exercises: 0,
                      labs: 0,
                      seminars: 0,
                    },
                totalContactHours: subject.contact_hours
                  ? Object.values(subject.contact_hours).reduce((acc, val) => acc + val, 0)
                  : 0,
                non_contact_hours: subject.non_contact_hours || 0,
                files: subject.files || [],
              })) || [],
            })) || [],
          };
        });
      })
    );
  }
}