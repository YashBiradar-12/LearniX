import { TestAttempt, QuestionFeedback } from '../types';
import { mockTestFeedback } from '../data/mockData';

export const analysisService = {
  analyzeTestPerformance: async (
    answers: Record<string, string | number>,
    paperId: string
  ): Promise<TestAttempt> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate test analysis
        const totalQuestions = Object.keys(answers).length;
        const correctAnswers = Math.floor(totalQuestions * 0.69); // 69% accuracy
        const totalMarks = totalQuestions * 5;
        const score = correctAnswers * 5;

        const testAttempt: TestAttempt = {
          id: `test_${Date.now()}`,
          paperId,
          studentId: 'student_1',
          startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          completedAt: new Date().toISOString(),
          answers,
          score,
          totalMarks,
          accuracy: (score / totalMarks) * 100,
          questionFeedback: mockTestFeedback,
        };

        resolve(testAttempt);
      }, 1500);
    });
  },

  getTestFeedback: async (_testId: string): Promise<QuestionFeedback[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTestFeedback);
      }, 300);
    });
  },

  identifyWeakAreas: async (_studentId: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Electrostatics', 'Magnetism', 'Circuit Analysis']);
      }, 400);
    });
  },

  analyzeTeacherPattern: async (_courseId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          questionStyle: [
            'Concept-based MCQs',
            'Numerical problems',
            'Derivations',
          ],
          difficultyDistribution: {
            easy: 20,
            intermediate: 50,
            difficult: 30,
          },
          importantTopics: [
            'Electromagnetism',
            'Thermodynamics',
            'Optics',
          ],
          patternStrength: 'strong',
        });
      }, 800);
    });
  },
};
