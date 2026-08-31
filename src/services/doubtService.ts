import { Doubt, Helper } from '../types';
import { mockHelpers } from '../data/mockData';

export const doubtService = {
  submitDoubt: async (
    studentId: string,
    subject: string,
    title: string,
    description: string,
    complexity: 'low' | 'medium' | 'high'
  ): Promise<Doubt> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doubt: Doubt = {
          id: `doubt_${Date.now()}`,
          studentId,
          subject,
          title,
          description,
          complexity,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
        };
        resolve(doubt);
      }, 500);
    });
  },

  findBestHelper: async (
    _doubt: Doubt,
    availableHelpers: Helper[]
  ): Promise<Helper> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate matching algorithm
        // In a real app, this would match based on expertise + availability + criticality
        const available = availableHelpers.filter((h) => h.availability);
        
        if (available.length === 0) {
          // If no one available, return highest rated
          resolve(
            availableHelpers.reduce((best, current) =>
              current.rating > best.rating ? current : best
            )
          );
        } else {
          // Return best available match
          resolve(
            available.reduce((best, current) =>
              current.rating > best.rating ? current : best
            )
          );
        }
      }, 2000);
    });
  },

  getAvailableHelpers: async (): Promise<Helper[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockHelpers);
      }, 300);
    });
  },

  connectToHelper: async (
    doubtId: string,
    helperId: string
  ): Promise<Doubt> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const helper = mockHelpers.find((h) => h.id === helperId);
        resolve({
          id: doubtId,
          studentId: 'student_1',
          subject: 'Physics',
          title: 'Question about Electrostatics',
          description: 'Not able to understand electric field concept',
          complexity: 'medium',
          status: 'matched',
          submittedAt: new Date().toISOString(),
          matchedWith: helper,
        });
      }, 1000);
    });
  },
};
