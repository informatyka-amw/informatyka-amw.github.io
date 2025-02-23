export interface Subject {
  name: string;
  description?: string;
  lecturer?: string; // Zmienione z instructor na lecturer zgodnie z YAML
  ects?: number;
  exam_type?: 'exam' | 'pass'; // Zmieniona nazwa examType → exam_type
  contact_hours?: {
    lecture?: number;
    exercises?: number;
    labs?: number;
    seminars?: number;
  };
  non_contact_hours?: number;
  files?: { name: string; url: string }[];
}

export interface Module {
  name: string;
  subjects: Subject[];
}

export interface Semester {
  number: number;
  modules: Module[];
}
