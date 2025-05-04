// src/types.ts

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    quizResults?: {
      interests?: {
        area: string;
        description: string;
      } | null;
      bachelors?: {
        selectedProgram?: {
          id: string;
          name: string;
          match: number;
          description: string;
        };
        topPrograms?: Array<{
          id: string;
          name: string;
          match: number;
          description: string;
        }>;
      } | null;
      university?: {
        universities?: Array<{
          id: number;
          degree: string;
          university: string;
          language: string;
          tuition: number;
          match: number;
          comments: string;
        }>;
      } | null;
    };
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
  
  export interface University {
    id: string;
    name: string;
    logo: string;        // Updated to point to the new logo location
    website: string;
    address: string;
    description: string;
    contactEmail: string;
    location: string;
    tuition: {
      min: number;
      max: number;
    };
    minGPA?: number;
    duration: number;
    bachelorDegrees: BachelorDegree[];
  }
  
  export interface BachelorDegree {
    id: number;          // Changed to number to match your CSV
    name: string;
    category: string;
    university: string;
    languagesOffered: string[];
    pricing: number;     // Added from your CSV
  }
  