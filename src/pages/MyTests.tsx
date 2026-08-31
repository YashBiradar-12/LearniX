import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, Download } from 'lucide-react';
import { Card, Button, Badge, LoadingSpinner } from '../components/ui';
import { paperService } from '../services/paperService';
import { Paper } from '../types';

export const MyTests: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await paperService.getUserPapers('student_1');
        setPapers(data);
      } catch (error) {
        console.error('Error loading papers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your tests..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tests</h1>
          <p className="text-lg text-gray-600">
            Track all your generated papers and test attempts
          </p>
        </div>

        {/* Generated Papers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Generated Papers</h2>
          
          {papers.length === 0 ? (
            <Card className="text-center py-12">
              <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-2">No papers generated yet</p>
              <p className="text-sm text-gray-500 mb-6">
                Start by generating your first personalized practice paper
              </p>
              <Link to="/generate-paper">
                <Button>Generate Your First Paper</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {papers.map((paper) => (
                <Card key={paper.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {paper.title}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="primary" size="sm">
                          {paper.type === 'practice'
                            ? 'Practice'
                            : paper.type === 'unit-test'
                            ? 'Unit Test'
                            : 'Semester Sample'}
                        </Badge>
                        <Badge variant="info" size="sm">
                          {paper.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {paper.questions.length}
                      </p>
                      <p className="text-xs text-gray-500">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {paper.duration}
                      </p>
                      <p className="text-xs text-gray-500">Minutes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {paper.questions.length * 5}
                      </p>
                      <p className="text-xs text-gray-500">Marks</p>
                    </div>
                  </div>

                  {/* Generated From */}
                  <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                    <p className="text-xs font-bold text-primary-900 mb-2">
                      Generated From:
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {paper.generatedFrom.teacherPattern && (
                        <span className="text-xs px-2 py-1 bg-white text-primary-700 rounded">
                          👨‍🏫 Teacher Pattern
                        </span>
                      )}
                      {paper.generatedFrom.studentWeakness && (
                        <span className="text-xs px-2 py-1 bg-white text-yellow-700 rounded">
                          📊 Your Weaknesses
                        </span>
                      )}
                      {paper.generatedFrom.courseMaterial && (
                        <span className="text-xs px-2 py-1 bg-white text-green-700 rounded">
                          📚 Course Material
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Created{' '}
                    {new Date(paper.createdAt).toLocaleDateString()}{' '}
                    {new Date(paper.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  <div className="flex gap-3">
                    <Link to={`/test/${paper.id}`} state={{ paper }} className="flex-1">
                      <Button fullWidth variant="primary" size="sm" className="flex items-center justify-center gap-2">
                        <Eye size={16} />
                        Start Test
                      </Button>
                    </Link>
                    <Button
                      fullWidth
                      variant="secondary"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Export
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Test Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Papers Generated
              </p>
              <p className="text-3xl font-bold text-primary-600">{papers.length}</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Questions Attempted
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {papers.reduce((sum, p) => sum + p.questions.length, 0)}
              </p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Favourite Focus
              </p>
              <p className="text-xl font-bold text-green-600">Weak Areas</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
