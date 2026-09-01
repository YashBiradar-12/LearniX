import React, { useState, useEffect } from 'react';
import { Upload, FileText, File, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, LoadingSpinner } from '../components/ui';
import { materialsService } from '../services/materialsService';
import { StudyMaterial } from '../types';

export const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const data = await materialsService.getUserMaterials('student_1');
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Determine file type
      let fileType: 'pdf' | 'ppt' | 'doc' | 'paper' = 'pdf';
      if (file.type.includes('presentation') || file.name.endsWith('.pptx')) {
        fileType = 'ppt';
      } else if (file.type.includes('document') || file.name.endsWith('.docx')) {
        fileType = 'doc';
      } else if (file.name.includes('paper')) {
        fileType = 'paper';
      }

      const newMaterial = await materialsService.uploadMaterial(
        'student_1',
        file,
        fileType
      );
      
      setMaterials([...materials, newMaterial]);

      // Simulate processing completion
      setTimeout(() => {
        setMaterials((prev) =>
          prev.map((m) =>
            m.id === newMaterial.id
              ? {
                  ...m,
                  processingStatus: 'completed' as const,
                  topicsExtracted: ['Electrostatics', 'Electric Field', 'Potential'],
                }
              : m
          )
        );
      }, 3000);
    } catch (error) {
      console.error('Error uploading material:', error);
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (_fileType: string) => {
    return <FileText size={24} className="text-olive-600" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return (
        <Badge variant="success" size="sm">
          <CheckCircle size={14} className="mr-1" />
          Processed
        </Badge>
      );
    }
    if (status === 'processing') {
      return (
        <Badge variant="info" size="sm">
          <Clock size={14} className="mr-1" />
          Processing
        </Badge>
      );
    }
    return (
      <Badge variant="danger" size="sm">
        <AlertCircle size={14} className="mr-1" />
        Error
      </Badge>
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your materials..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Study Material</h1>
          <p className="text-lg text-gray-600">
            Upload and organize your course materials
          </p>
        </div>

        {/* Upload Area */}
        <Card variant="bordered" className="mb-8">
          <div className="text-center py-12">
            <div className="inline-block bg-primary-100 p-4 rounded-full mb-4">
              <Upload size={32} className="text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Study Materials
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Upload notes, PDFs, PPTs, previous papers, and more. We'll analyze them to understand your teacher's pattern.
            </p>
            <label>
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                accept=".pdf,.pptx,.docx"
              />
              <Button
                as="span"
                onClick={() => {
                  const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
                  if (fileInput) fileInput.click();
                }}
                isLoading={uploading}
                size="lg"
              >
                Choose File
              </Button>
            </label>
            <p className="text-xs text-gray-500 mt-4">
              Supported: PDF, PPT, DOC • Max 50MB
            </p>
          </div>
        </Card>

        {/* Materials Grid */}
        {materials.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Materials ({materials.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((material) => (
                <Card key={material.id} variant="elevated">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      {getFileIcon(material.fileType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            {material.fileName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {material.size.toFixed(1)} MB • Uploaded{' '}
                            {new Date(material.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(material.processingStatus)}
                      </div>

                      {material.processingStatus === 'completed' && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            Topics Extracted:
                          </p>
                          <div className="flex gap-1.5 flex-wrap">
                            {material.topicsExtracted.map((topic) => (
                              <Badge key={topic} variant="info" size="sm">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {material.processingStatus === 'processing' && (
                        <div className="mt-3 p-2 bg-blue-50 rounded">
                          <p className="text-xs text-blue-700">
                            Analysing your material...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {materials.length === 0 && (
          <Card className="text-center py-8">
            <File size={32} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No materials uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Start by uploading your first file
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
