import { Student, Performance as StudentPerformance } from '../types';
import { mockStudent, mockPerformance, mockTopics } from '../data/mockData';
import { isSupabaseConfigured, supabaseUserStore } from '../lib/supabase';

const STORAGE_PREFIX = 'learnix-student-data';

const getLocalStorageKey = (studentId: string) => `${STORAGE_PREFIX}:${studentId}`;

const getStoredStudent = (studentId: string): Student | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(getLocalStorageKey(studentId));
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as Student;
  } catch {
    return null;
  }
};

const persistStudent = (studentId: string, student: Student) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(getLocalStorageKey(studentId), JSON.stringify(student));
};

export const studentService = {
  getStudentProfile: async (studentId: string): Promise<Student> => {
    if (isSupabaseConfigured && studentId) {
      try {
        const storedProfile = await supabaseUserStore.getSection<Student>(studentId, 'student_profile');
        if (storedProfile) {
          return storedProfile;
        }
      } catch (error) {
        console.warn('Supabase student profile read failed. Falling back to local storage.', error);
      }
    }

    const storedStudent = getStoredStudent(studentId);
    if (storedStudent) {
      return storedStudent;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = { ...mockStudent, id: studentId || mockStudent.id };
        persistStudent(studentId, profile);
        resolve(profile);
      }, 300);
    });
  },

  getStudentPerformance: async (studentId: string): Promise<StudentPerformance> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockPerformance,
          studentId,
        });
      }, 500);
    });
  },

  updateStudentProfile: async (
    studentId: string,
    data: Partial<Student>
  ): Promise<Student> => {
    const current = getStoredStudent(studentId) ?? mockStudent;
    const nextProfile = { ...current, ...data, id: studentId || current.id };

    persistStudent(studentId, nextProfile);

    if (isSupabaseConfigured) {
      try {
        await supabaseUserStore.saveSection(studentId, 'student_profile', nextProfile);
      } catch (error) {
        console.warn('Supabase student profile sync failed. Local data is still saved.', error);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nextProfile);
      }, 300);
    });
  },

  getWeakTopics: async (_studentId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockTopics.filter((t) =>
            ['weak', 'needs-practice'].includes(t.difficulty)
          )
        );
      }, 300);
    });
  },

  getStrongTopics: async (_studentId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockTopics.filter((t) =>
            ['good', 'strong'].includes(t.difficulty)
          )
        );
      }, 300);
    });
  },
};
