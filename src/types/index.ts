export interface Student {
  id: string;
  name: string;
  email: string;
  courses: Course[];
  profilePicture?: string;
  joinDate: string;
}

export interface Course {
  id: string;
  name: string;
  subject: string;
  teacher: TeacherProfile;
}

export interface TeacherProfile {
  id: string;
  name: string;
  subject: string;
  questionStyle: string[];
  difficultyDistribution: {
    easy: number;
    intermediate: number;
    difficult: number;
  };
  importantTopics: string[];
  patternLearned: boolean;
  lastUpdated: string;
}

export interface Topic {
  id: string;
  name: string;
  courseId: string;
  studentAccuracy: number;
  difficulty: 'weak' | 'needs-practice' | 'good' | 'strong';
  questionsAttempted: number;
  lastTested: string;
}

export interface Paper {
  id: string;
  title: string;
  courseId: string;
  type: 'practice' | 'unit-test' | 'semester-sample';
  focus: 'full-syllabus' | 'weak-areas' | 'selected-topics';
  difficulty: 'easy' | 'intermediate' | 'difficult' | 'adaptive';
  questions: Question[];
  totalQuestions: number;
  createdAt: string;
  duration: number;
  generatedFrom: {
    teacherPattern: boolean;
    studentWeakness: boolean;
    courseMaterial: boolean;
  };
}

export interface Question {
  id: string;
  number: number;
  text: string;
  type: 'mcq' | 'short-answer' | 'long-answer' | 'numerical';
  topic: string;
  difficulty: 'easy' | 'intermediate' | 'difficult';
  options?: string[];
  correctAnswer?: string | number;
  marks: number;
  aiEstimatedDifficulty: 'easy' | 'intermediate' | 'difficult';
}

export interface TestAttempt {
  id: string;
  paperId: string;
  studentId: string;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, string | number>;
  score: number;
  totalMarks: number;
  accuracy: number;
  questionFeedback: QuestionFeedback[];
}

export interface QuestionFeedback {
  questionId: string;
  studentDifficulty: 'easy' | 'intermediate' | 'difficult';
  aiEstimatedDifficulty: 'easy' | 'intermediate' | 'difficult';
  finalDifficulty: 'easy' | 'intermediate' | 'difficult';
  studentAccuracy: number;
  feedbackDate: string;
}

export interface Doubt {
  id: string;
  studentId: string;
  subject: string;
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  status: 'submitted' | 'analyzing' | 'matched' | 'resolved';
  submittedAt: string;
  matchedWith?: Helper;
}

export interface Helper {
  id: string;
  name: string;
  type: 'senior-student' | 'junior-teacher' | 'senior-teacher';
  expertise: string[];
  rating: number;
  availability: boolean;
  responseTime: string;
  matchReason: string;
}

export interface StudyMaterial {
  id: string;
  studentId: string;
  fileName: string;
  fileType: 'pdf' | 'ppt' | 'doc' | 'paper';
  uploadedAt: string;
  processingStatus: 'processing' | 'completed' | 'error';
  topicsExtracted: string[];
  size: number;
}

export interface Performance {
  studentId: string;
  overallAccuracy: number;
  questionsAttempted: number;
  testsCompleted: number;
  topicWisePerformance: Topic[];
  recentTests: TestAttempt[];
  strengthAreas: string[];
  weakAreas: string[];
  improvementTrend: number;
}
