// src/services/universityDataService.ts
import { University, BachelorDegree } from '../types';

// Instead of loading from files, we'll provide static data
// This will avoid the need for Papa and XLSX packages for now
export const loadUniversityData = async (): Promise<University[]> => {
  try {
    // Return static university data
    return [
      {
        id: 'unyt',
        name: 'University of New York Tirana (UNYT)',
        logo: '/images/uni/unyt_logo.png',
        website: 'https://unyt.edu.al',
        address: 'Rr. Kodra e Diellit, Selitë, Tirana, Albania',
        description: 'UNYT is a private university in Tirana that offers American and British degrees in a variety of fields.',
        contactEmail: 'info@unyt.edu.al',
        location: 'Tirana',
        tuition: {
          min: 3600,
          max: 4500
        },
        duration: 3,
        minGPA: 3.0,
        bachelorDegrees: [
          {
            id: 1,
            name: 'Computer Science',
            category: 'Technology',
            university: 'University of New York Tirana (UNYT)',
            languagesOffered: ['English'],
            pricing: 3600
          },
          {
            id: 2,
            name: 'Business Administration',
            category: 'Business',
            university: 'University of New York Tirana (UNYT)',
            languagesOffered: ['English'],
            pricing: 3800
          },
          {
            id: 3,
            name: 'Design',
            category: 'Arts',
            university: 'University of New York Tirana (UNYT)',
            languagesOffered: ['English'],
            pricing: 4200
          }
        ]
      },
      {
        id: 'albanian',
        name: 'Albanian University',
        logo: '/images/uni/albanian_logo.png',
        website: 'https://albanianuniversity.edu.al',
        address: 'Bulevardi Zogu I, Tirana, Albania',
        description: 'Albanian University is a prominent private university offering degrees in various disciplines.',
        contactEmail: 'info@albanianuniversity.edu.al',
        location: 'Tirana',
        tuition: {
          min: 1500,
          max: 2800
        },
        duration: 3,
        minGPA: 2.5,
        bachelorDegrees: [
          {
            id: 4,
            name: 'Graphic Design',
            category: 'Arts',
            university: 'Albanian University',
            languagesOffered: ['Albanian'],
            pricing: 1500
          },
          {
            id: 5,
            name: 'Law',
            category: 'Law',
            university: 'Albanian University',
            languagesOffered: ['Albanian'],
            pricing: 2000
          }
        ]
      },
      {
        id: 'uet',
        name: 'European University of Tirana (UET)',
        logo: '/images/uni/uet_logo.png',
        website: 'https://uet.edu.al',
        address: 'Bulevardi Gjergj Fishta, Tirana, Albania',
        description: 'UET is a dynamic private university dedicated to excellence in teaching and research.',
        contactEmail: 'info@uet.edu.al',
        location: 'Tirana',
        tuition: {
          min: 3000,
          max: 4000
        },
        duration: 3,
        minGPA: 2.8,
        bachelorDegrees: [
          {
            id: 6,
            name: 'Graphic Design',
            category: 'Arts',
            university: 'European University of Tirana (UET)',
            languagesOffered: ['Albanian'],
            pricing: 3000
          },
          {
            id: 7,
            name: 'Communication',
            category: 'Media',
            university: 'European University of Tirana (UET)',
            languagesOffered: ['Albanian'],
            pricing: 3200
          }
        ]
      },
      {
        id: 'polis',
        name: 'Polis University',
        logo: '/images/uni/polis_logo.png',
        website: 'https://universitetipolis.edu.al',
        address: 'Rr. Bylis 12, Tirana, Albania',
        description: 'Polis University specializes in architecture, design, and urban planning education.',
        contactEmail: 'info@universitetipolis.edu.al',
        location: 'Tirana',
        tuition: {
          min: 3600,
          max: 4500
        },
        duration: 4,
        minGPA: 3.0,
        bachelorDegrees: [
          {
            id: 8,
            name: 'Architecture',
            category: 'Architecture',
            university: 'Polis University',
            languagesOffered: ['Albanian', 'English'],
            pricing: 3600
          },
          {
            id: 9,
            name: 'Graphic Design',
            category: 'Arts',
            university: 'Polis University',
            languagesOffered: ['Albanian'],
            pricing: 3600
          }
        ]
      }
    ];
  } catch (error) {
    console.error("Error loading university data:", error);
    return [];
  }
};

// Later, you can implement these functions to actually load data from files
// For now, we're providing static data to simplify the implementation
const loadUniversityInfoFromExcel = async (): Promise<Partial<University>[]> => {
  return [];
};

const loadDegreesFromCSV = async (): Promise<Record<string, BachelorDegree[]>> => {
  return {};
};