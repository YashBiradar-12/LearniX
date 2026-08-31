import { Paper, Question } from '../types';
import { mockQuestions } from '../data/mockData';

export const paperService = {
  generatePaper: async (
    courseId: string,
    type: 'practice' | 'unit-test' | 'semester-sample',
    focus: 'full-syllabus' | 'weak-areas' | 'selected-topics',
    difficulty: 'easy' | 'intermediate' | 'difficult' | 'adaptive',
    numberOfQuestions: number,
    questionTypes: string[]
  ): Promise<Paper> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter questions based on parameters
        let filteredQuestions: Question[] = [...mockQuestions];

        // Filter by type
        if (questionTypes.length > 0) {
          filteredQuestions = filteredQuestions.filter((q) =>
            questionTypes.includes(q.type)
          );
        }

        // Filter by difficulty
        if (difficulty !== 'adaptive') {
          filteredQuestions = filteredQuestions.filter(
            (q) => q.difficulty === difficulty
          );
        }

        // Shuffle and take required number
        filteredQuestions = filteredQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, numberOfQuestions);

        const paper: Paper = {
          id: `paper_${Date.now()}`,
          title: `${type === 'practice' ? 'Practice Test' : type === 'unit-test' ? 'Unit Test' : 'Semester Sample Paper'} - ${new Date().toLocaleDateString()}`,
          courseId,
          type,
          focus,
          difficulty,
          questions: filteredQuestions.map((q, idx) => ({
            ...q,
            number: idx + 1,
          })),
          totalQuestions: filteredQuestions.length,
          createdAt: new Date().toISOString(),
          duration: numberOfQuestions * 2, // 2 minutes per question
          generatedFrom: {
            teacherPattern: true,
            studentWeakness: focus === 'weak-areas',
            courseMaterial: true,
          },
        };

        resolve(paper);
      }, 2000);
    });
  },

  getPaperById: async (paperId: string): Promise<Paper | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: just return a paper
        resolve({
          id: paperId,
          title: 'Sample Test',
          courseId: 'course_physics',
          type: 'practice',
          focus: 'weak-areas',
          difficulty: 'intermediate',
          questions: mockQuestions.map((q, idx) => ({ ...q, number: idx + 1 })),
          totalQuestions: mockQuestions.length,
          createdAt: new Date().toISOString(),
          duration: 30,
          generatedFrom: {
            teacherPattern: true,
            studentWeakness: true,
            courseMaterial: true,
          },
        });
      }, 500);
    });
  },

  getUserPapers: async (_studentId: string): Promise<Paper[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'paper_1',
            title: 'Electrostatics Practice Test',
            courseId: 'course_physics',
            type: 'practice',
            focus: 'weak-areas',
            difficulty: 'intermediate',
            questions: mockQuestions.slice(0, 3),
            totalQuestions: 3,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 15,
            generatedFrom: {
              teacherPattern: true,
              studentWeakness: true,
              courseMaterial: true,
            },
          },
          {
            id: 'paper_2',
            title: 'Full Syllabus Test',
            courseId: 'course_physics',
            type: 'semester-sample',
            focus: 'full-syllabus',
            difficulty: 'adaptive',
            questions: mockQuestions,
            totalQuestions: mockQuestions.length,
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            generatedFrom: {
              teacherPattern: true,
              studentWeakness: false,
              courseMaterial: true,
            },
          },
        ]);
      }, 500);
    });
  },
};
