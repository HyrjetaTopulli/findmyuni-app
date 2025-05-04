// src/redux/slices/universitySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { University } from '../../types';

interface UniversityState {
  universities: University[];
  filteredUniversities: University[];
  selectedUniversity: University | null;
  compareList: University[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UniversityState = {
  universities: [],
  filteredUniversities: [],
  selectedUniversity: null,
  compareList: [],
  isLoading: false,
  error: null,
};

export const fetchUniversities = createAsyncThunk(
  'university/fetchUniversities',
  async (_, { rejectWithValue }) => {
    try {
      // Comprehensive list of Albanian universities with their programs
      const universities = [
        {
          id: 'unyt',
          name: 'University of New York Tirana (UNYT)',
          logo: '/images/uni/21.png',
          website: 'https://unyt.edu.al',
          address: 'Rr. Kodra e Diellit, Selitë, Tirana, Albania',
          description: 'UNYT is a private university in Tirana that offers American and British degrees in a variety of fields. It provides high-quality education with an international perspective and focuses on preparing students for the global job market.',
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
              name: 'Economics',
              category: 'Business',
              university: 'University of New York Tirana (UNYT)',
              languagesOffered: ['English'],
              pricing: 3800
            },
            {
              id: 4,
              name: 'Political Science',
              category: 'Social Sciences',
              university: 'University of New York Tirana (UNYT)',
              languagesOffered: ['English'],
              pricing: 3700
            },
            {
              id: 5,
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
          logo: '/images/uni/2.png',
          website: 'https://albanianuniversity.edu.al',
          address: 'Bulevardi Zogu I, Tirana, Albania',
          description: 'Albanian University is a prominent private university offering degrees in various disciplines. It emphasizes practical education and has strong connections with businesses and industry professionals.',
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
              id: 6,
              name: 'Graphic Design',
              category: 'Arts',
              university: 'Albanian University',
              languagesOffered: ['Albanian'],
              pricing: 1500
            },
            {
              id: 7,
              name: 'Law',
              category: 'Law',
              university: 'Albanian University',
              languagesOffered: ['Albanian'],
              pricing: 2000
            },
            {
              id: 8,
              name: 'Nursing',
              category: 'Health Sciences',
              university: 'Albanian University',
              languagesOffered: ['Albanian'],
              pricing: 2200
            },
            {
              id: 9,
              name: 'Dental Medicine',
              category: 'Health Sciences',
              university: 'Albanian University',
              languagesOffered: ['Albanian'],
              pricing: 2800
            },
            {
              id: 10,
              name: 'Pharmacy',
              category: 'Health Sciences',
              university: 'Albanian University',
              languagesOffered: ['Albanian'],
              pricing: 2500
            }
          ]
        },
        {
          id: 'uet',
          name: 'European University of Tirana (UET)',
          logo: '/images/uni/8.png',
          website: 'https://uet.edu.al',
          address: 'Bulevardi Gjergj Fishta, Tirana, Albania',
          description: 'UET is a dynamic private university dedicated to excellence in teaching and research. It offers a modern learning environment and emphasizes critical thinking and practical skills development.',
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
              id: 11,
              name: 'Graphic Design',
              category: 'Arts',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 12,
              name: 'Communication',
              category: 'Media',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3200
            },
            {
              id: 13,
              name: 'Communication and Public Relations',
              category: 'Media',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3200
            },
            {
              id: 14,
              name: 'Political Science',
              category: 'Social Sciences',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3300
            },
            {
              id: 15,
              name: 'Law',
              category: 'Law',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3500
            },
            {
              id: 16,
              name: 'Finance',
              category: 'Business',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3400
            },
            {
              id: 17,
              name: 'Business Management',
              category: 'Business',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3400
            },
            {
              id: 18,
              name: 'Computer Science',
              category: 'Technology',
              university: 'European University of Tirana (UET)',
              languagesOffered: ['Albanian'],
              pricing: 3800
            }
          ]
        },
        {
          id: 'polis',
          name: 'Polis University',
          logo: '/images/uni/15.png',
          website: 'https://universitetipolis.edu.al',
          address: 'Rr. Bylis 12, Tirana, Albania',
          description: 'Polis University specializes in architecture, design, and urban planning education. It has a strong focus on innovation and sustainability, with international partnerships and exchange programs.',
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
              id: 19,
              name: 'Architecture',
              category: 'Architecture',
              university: 'Polis University',
              languagesOffered: ['Albanian', 'English'],
              pricing: 3900
            },
            {
              id: 20,
              name: 'Graphic Design',
              category: 'Arts',
              university: 'Polis University',
              languagesOffered: ['Albanian'],
              pricing: 3600
            },
            {
              id: 21,
              name: 'Interior Design',
              category: 'Design',
              university: 'Polis University',
              languagesOffered: ['Albanian'],
              pricing: 3800
            },
            {
              id: 22,
              name: 'Urban Planning',
              category: 'Architecture',
              university: 'Polis University',
              languagesOffered: ['Albanian', 'English'],
              pricing: 4000
            }
          ]
        },
        {
          id: 'epoka',
          name: 'Epoka University',
          logo: '/images/uni/6.png',
          website: 'https://epoka.edu.al',
          address: 'Rr. Tiranë-Rinas, Km. 12, Tirana, Albania',
          description: 'Epoka University is known for its strong programs in engineering, architecture, and business. It offers a multicultural environment with professors and students from different countries.',
          contactEmail: 'info@epoka.edu.al',
          location: 'Tirana',
          tuition: {
            min: 3500,
            max: 4800
          },
          duration: 3,
          minGPA: 3.0,
          bachelorDegrees: [
            {
              id: 23,
              name: 'Computer Engineering',
              category: 'Engineering',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 4300
            },
            {
              id: 24,
              name: 'Civil Engineering',
              category: 'Engineering',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 4500
            },
            {
              id: 25,
              name: 'Architecture',
              category: 'Architecture',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 4800
            },
            {
              id: 26,
              name: 'Business Administration',
              category: 'Business',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 3800
            },
            {
              id: 27,
              name: 'Banking and Finance',
              category: 'Business',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 3800
            },
            {
              id: 28,
              name: 'Political Science',
              category: 'Social Sciences',
              university: 'Epoka University',
              languagesOffered: ['English'],
              pricing: 3500
            }
          ]
        },
        {
          id: 'mediterranean',
          name: 'Mediterranean University of Albania',
          logo: '/images/uni/13.jpg',
          website: 'https://umsh.edu.al',
          address: 'Bulevardi Gjergj Fishta, Tirana, Albania',
          description: 'Mediterranean University of Albania focuses on applied sciences and professional development. The university has modern facilities and emphasizes practical training alongside theoretical knowledge.',
          contactEmail: 'info@umsh.edu.al',
          location: 'Tirana',
          tuition: {
            min: 2500,
            max: 3500
          },
          duration: 3,
          minGPA: 2.7,
          bachelorDegrees: [
            {
              id: 29,
              name: 'Business Administration',
              category: 'Business',
              university: 'Mediterranean University of Albania',
              languagesOffered: ['Albanian'],
              pricing: 2500
            },
            {
              id: 30,
              name: 'Tourism Management',
              category: 'Business',
              university: 'Mediterranean University of Albania',
              languagesOffered: ['Albanian'],
              pricing: 2700
            },
            {
              id: 31,
              name: 'Computer Science',
              category: 'Technology',
              university: 'Mediterranean University of Albania',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 32,
              name: 'Law',
              category: 'Law',
              university: 'Mediterranean University of Albania',
              languagesOffered: ['Albanian'],
              pricing: 3200
            }
          ]
        },
        {
          id: 'metropolitan',
          name: 'University Metropolitan Tirana',
          logo: '/images/uni/14.png',
          website: 'https://umt.edu.al',
          address: 'Rruga Sotir Kolea, Tirana, Albania',
          description: 'University Metropolitan Tirana specializes in business, technology, and design education. It offers innovative teaching methods and strong industry connections for internships and job placement.',
          contactEmail: 'info@umt.edu.al',
          location: 'Tirana',
          tuition: {
            min: 2800,
            max: 3800
          },
          duration: 3,
          minGPA: 2.8,
          bachelorDegrees: [
            {
              id: 33,
              name: 'Graphic Design',
              category: 'Arts',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 2800
            },
            {
              id: 34,
              name: 'Fashion Design',
              category: 'Arts',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 35,
              name: 'Interior Design',
              category: 'Design',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 3200
            },
            {
              id: 36,
              name: 'Business Administration',
              category: 'Business',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 37,
              name: 'Information Technology',
              category: 'Technology',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 3500
            },
            {
              id: 38,
              name: 'Digital Marketing',
              category: 'Business',
              university: 'University Metropolitan Tirana',
              languagesOffered: ['Albanian'],
              pricing: 3200
            }
          ]
        },
        {
          id: 'tbu',
          name: 'Tirana Business University (TBU)',
          logo: '/images/uni/16.png',
          website: 'https://tbu.edu.al',
          address: 'Rruga Kavajës, Tirana, Albania',
          description: 'Tirana Business University specializes in business and economics education. It offers a practical approach to learning with case studies, internships, and collaborations with companies.',
          contactEmail: 'info@tbu.edu.al',
          location: 'Tirana',
          tuition: {
            min: 2800,
            max: 3500
          },
          duration: 3,
          minGPA: 2.7,
          bachelorDegrees: [
            {
              id: 39,
              name: 'Business Administration',
              category: 'Business',
              university: 'Tirana Business University (TBU)',
              languagesOffered: ['Albanian', 'English'],
              pricing: 2800
            },
            {
              id: 40,
              name: 'Finance and Banking',
              category: 'Business',
              university: 'Tirana Business University (TBU)',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 41,
              name: 'Management Information Systems',
              category: 'Technology',
              university: 'Tirana Business University (TBU)',
              languagesOffered: ['Albanian'],
              pricing: 3200
            },
            {
              id: 42,
              name: 'Marketing',
              category: 'Business',
              university: 'Tirana Business University (TBU)',
              languagesOffered: ['Albanian'],
              pricing: 3000
            },
            {
              id: 43,
              name: 'Economics',
              category: 'Business',
              university: 'Tirana Business University (TBU)',
              languagesOffered: ['Albanian', 'English'],
              pricing: 3500
            }
          ]
        },
        {
          id: 'luarasi',
          name: 'Luarasi University',
          logo: '/images/uni/11.png',
          website: 'https://luarasi-univ.edu.al',
          address: 'Rruga Myrteza Topi, Tirana, Albania',
          description: 'Luarasi University offers programs in law, economics, and information technology. It has a strong focus on academic excellence and preparing students for professional careers.',
          contactEmail: 'info@luarasi-univ.edu.al',
          location: 'Tirana',
          tuition: {
            min: 2000,
            max: 3000
          },
          duration: 3,
          minGPA: 2.6,
          bachelorDegrees: [
            {
              id: 44,
              name: 'Law',
              category: 'Law',
              university: 'Luarasi University',
              languagesOffered: ['Albanian'],
              pricing: 2500
            },
            {
              id: 45,
              name: 'Economics',
              category: 'Business',
              university: 'Luarasi University',
              languagesOffered: ['Albanian'],
              pricing: 2000
            },
            {
              id: 46,
              name: 'Computer Science',
              category: 'Technology',
              university: 'Luarasi University',
              languagesOffered: ['Albanian'],
              pricing: 2800
            },
            {
              id: 47,
              name: 'Finance and Banking',
              category: 'Business',
              university: 'Luarasi University',
              languagesOffered: ['Albanian'],
              pricing: 2300
            },
            {
              id: 48,
              name: 'Political Science',
              category: 'Social Sciences',
              university: 'Luarasi University',
              languagesOffered: ['Albanian'],
              pricing: 2200
            }
          ]
        },
        {
          id: 'academy-film',
          name: 'Academy of Film & Multimedia Marubi',
          logo: '/images/uni/3.png',
          website: 'https://afmm.edu.al',
          address: 'Rruga Aleksandër Moisiu, Tirana, Albania',
          description: 'The Academy of Film & Multimedia Marubi is specialized in film production, acting, and multimedia studies. It offers practical training with state-of-the-art equipment and experienced industry professionals.',
          contactEmail: 'info@afmm.edu.al',
          location: 'Tirana',
          tuition: {
            min: 3000,
            max: 4000
          },
          duration: 3,
          minGPA: 2.8,
          bachelorDegrees: [
            {
              id: 49,
              name: 'Film Directing',
              category: 'Arts',
              university: 'Academy of Film & Multimedia Marubi',
              languagesOffered: ['Albanian'],
              pricing: 3800
            },
            {
              id: 50,
              name: 'Cinematography',
              category: 'Arts',
              university: 'Academy of Film & Multimedia Marubi',
              languagesOffered: ['Albanian'],
              pricing: 4000
            },
            {
              id: 51,
              name: 'Acting',
              category: 'Arts',
              university: 'Academy of Film & Multimedia Marubi',
              languagesOffered: ['Albanian'],
              pricing: 3500
            },
            {
              id: 52,
              name: 'Multimedia Production',
              category: 'Media',
              university: 'Academy of Film & Multimedia Marubi',
              languagesOffered: ['Albanian'],
              pricing: 3000
            }
          ]
        },
      ];
      
      return universities;
    } catch (error) {
      return rejectWithValue('Failed to fetch universities');
    }
  }
);

const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    setSelectedUniversity: (state, action) => {
      state.selectedUniversity = action.payload;
    },
    addToCompareList: (state, action) => {
      if (state.compareList.length < 3 && !state.compareList.find(uni => uni.id === action.payload.id)) {
        state.compareList.push(action.payload);
      }
    },
    removeFromCompareList: (state, action) => {
      state.compareList = state.compareList.filter(uni => uni.id !== action.payload.id);
    },
    clearCompareList: (state) => {
      state.compareList = [];
    },
    filterUniversities: (state, action) => {
      const { location, tuitionMin, tuitionMax, duration } = action.payload;
      state.filteredUniversities = state.universities.filter(uni => {
        if (location && uni.location !== location) return false;
        if (tuitionMin && uni.tuition.min < tuitionMin) return false;
        if (tuitionMax && uni.tuition.max > tuitionMax) return false;
        if (duration && uni.duration !== duration) return false;
        return true;
      });
    },
    resetFilters: (state) => {
      state.filteredUniversities = state.universities;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.universities = action.payload;
        state.filteredUniversities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedUniversity,
  addToCompareList,
  removeFromCompareList,
  clearCompareList,
  filterUniversities,
  resetFilters,
} = universitySlice.actions;
export default universitySlice.reducer;