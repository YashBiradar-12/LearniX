import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { Card, Button, LoadingSpinner } from '../components/ui';
import { TopicProgressCard } from '../components/dashboard/TopicProgressCard';
import { studentService } from '../services/studentService';
import { Performance } from '../types';

export const PerformancePage: React.FC = () => {
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPerformance = async () => {
      try {
        const data = await studentService.getStudentPerformance('student_1');
        setPerformance(data);
      } catch (error) {
        console.error('Error loading performance:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPerformance();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your performance data..." />;
  }

  if (!performance) {
    return <div className="p-8">Error loading performance data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Performance
          </h1>
          <p className="text-lg text-gray-600">
            Track your progress across topics and tests
          </p>
        </div>

        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="elevated">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Overall Accuracy</p>
                <p className="text-4xl font-bold text-gray-900">
                  {Math.round(performance.overallAccuracy)}%
                </p>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg">
                <TrendingUp size={24} className="text-primary-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Trend: +{performance.improvementTrend}% this week
            </p>
          </Card>

          <Card variant="elevated">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Questions Attempted
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {performance.questionsAttempted}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Target size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Across {performance.testsCompleted} tests
            </p>
          </Card>

          <Card variant="elevated">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Tests Completed</p>
                <p className="text-4xl font-bold text-gray-900">
                  {performance.testsCompleted}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Zap size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Average: {Math.round(performance.questionsAttempted / performance.testsCompleted)} Q/test
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Topic-wise Performance */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Topic-wise Performance
              </h2>
              <div className="space-y-3">
                {performance.topicWisePerformance.map((topic) => (
                  <TopicProgressCard key={topic.id} topic={topic} />
                ))}
              </div>
            </Card>
          </div>

          {/* Insights */}
          <div className="space-y-6">
            {/* Strength Areas */}
            <Card variant="elevated" className="bg-green-50 border-green-200">
              <h3 className="font-bold text-green-900 mb-4">💪 Strong Areas</h3>
              <div className="space-y-2">
                {performance.strengthAreas.map((area) => (
                  <p
                    key={area}
                    className="text-sm text-green-700 px-3 py-2 bg-white rounded"
                  >
                    {area}
                  </p>
                ))}
              </div>
            </Card>

            {/* Weak Areas */}
            <Card variant="elevated" className="bg-yellow-50 border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-4">⚠️ Areas to Improve</h3>
              <div className="space-y-2">
                {performance.weakAreas.map((area) => (
                  <p
                    key={area}
                    className="text-sm text-yellow-700 px-3 py-2 bg-white rounded"
                  >
                    {area}
                  </p>
                ))}
              </div>
            </Card>

            {/* Recommendation */}
            <Card variant="elevated" className="bg-primary-50 border-primary-200">
              <h3 className="font-bold text-primary-900 mb-3">📚 Next Step</h3>
              <p className="text-sm text-primary-700 mb-4">
                Focus on your weak areas with targeted practice tests.
              </p>
              <Link to="/generate-paper">
                <Button variant="primary" fullWidth size="sm">
                  Generate Weak-Area Paper
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Recent Tests */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Tests</h2>
          <div className="space-y-3">
            {[
              {
                name: 'Full Syllabus Test',
                score: '69/100',
                accuracy: '69%',
                date: '2 days ago',
              },
              {
                name: 'Electrostatics Practice',
                score: '35/50',
                accuracy: '70%',
                date: '4 days ago',
              },
              {
                name: 'Thermodynamics Unit Test',
                score: '61/100',
                accuracy: '61%',
                date: '1 week ago',
              },
            ].map((test, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
              >
                <div>
                  <p className="font-medium text-gray-900">{test.name}</p>
                  <p className="text-sm text-gray-500">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{test.score}</p>
                  <p className="text-sm text-gray-500">{test.accuracy}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
