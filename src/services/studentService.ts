import { Student, Performance as StudentPerformance } from '../types';
import { mockStudent, mockPerformance, mockTopics } from '../data/mockData';

export const studentService = {
  getStudentProfile: async (_studentId: string): Promise<Student> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStudent);
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
    _studentId: string,
    data: Partial<Student>
  ): Promise<Student> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockStudent, ...data });
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
