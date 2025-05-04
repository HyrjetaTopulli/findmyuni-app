// src/types/index.ts
export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string; // Note: In real app, never store plaintext passwords in state
  quizResults?: {
    interests?: any;
    bachelors?: any;
    university?: any;
  };
}

export interface University {
  id: string;
  name: string;
  logo: string; // URL to the logo image
  website: string;
  address: string;
  tuition: {
    min: number;
    max: number;
  };
  description: string;
  bachelorDegrees: BachelorDegree[];
  location: string;
  duration: number; // in years
  minGPA?: number;
  contactEmail?: string;
}

export interface BachelorDegree {
  id: string;
  name: string;
  category: string;
  university: string;
  languagesOffered: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  universityId?: string;
  category: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'openDay' | 'applicationDeadline' | 'scholarshipExam' | 'meeting';
  description: string;
  universityId?: string;
}