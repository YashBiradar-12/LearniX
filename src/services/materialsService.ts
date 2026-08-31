import { StudyMaterial } from '../types';
import { mockStudyMaterials } from '../data/mockData';

export const materialsService = {
  getUserMaterials: async (studentId: string): Promise<StudyMaterial[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockStudyMaterials.map((m) => ({
            ...m,
            studentId,
          }))
        );
      }, 500);
    });
  },

  uploadMaterial: async (
    studentId: string,
    file: File,
    fileType: 'pdf' | 'ppt' | 'doc' | 'paper'
  ): Promise<StudyMaterial> => {
    return new Promise((resolve) => {
      // Simulate upload and processing delay
      setTimeout(() => {
        const material: StudyMaterial = {
          id: `material_${Date.now()}`,
          studentId,
          fileName: file.name,
          fileType,
          uploadedAt: new Date().toISOString(),
          processingStatus: 'processing',
          topicsExtracted: [],
          size: file.size / (1024 * 1024), // Convert to MB
        };

        // Simulate processing completion after 3 seconds
        setTimeout(() => {
          material.processingStatus = 'completed';
          material.topicsExtracted = [
            'Electrostatics',
            'Coulombs Law',
            'Electric Field',
            'Electric Potential',
          ];
        }, 3000);

        resolve(material);
      }, 500);
    });
  },

  deleteMaterial: async (_materialId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  },

  getMaterialTopics: async (_materialId: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Electrostatics', 'Coulombs Law', 'Electric Field']);
      }, 300);
    });
  },
};
