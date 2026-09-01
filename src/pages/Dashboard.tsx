import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertCircle,
  Zap,
  ArrowRight,
  BookMarked,
} from 'lucide-react';
import { Card, Button, LoadingSpinner } from '../components/ui';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { TopicProgressCard } from '../components/dashboard/TopicProgressCard';
import { studentService } from '../services/studentService';
import { authService } from '../services/authService';
import { Student, Performance } from '../types';

export const Dashboard: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = authService.getCurrentUser('student');
        const studentId = currentUser?.id || 'student_1';

        const [studentData, performanceData] = await Promise.all([
          studentService.getStudentProfile(studentId),
          studentService.getStudentPerformance(studentId),
        ]);

        const mergedStudent = {
          ...studentData,
          name: currentUser?.name || studentData.name,
          email: currentUser?.email || studentData.email,
        };

        setStudent(mergedStudent);
        setPerformance(performanceData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  if (!student || !performance) {
    return <div className="p-8 text-neutral-700">Error loading data</div>;
  }

  const weakTopics = performance.topicWisePerformance.filter((t) =>
    ['weak', 'needs-practice'].includes(t.difficulty)
  );

  const recentActivities = [
    { type: 'test', message: 'Physics Test completed', time: '2 hours ago' },
    { type: 'analysis', message: 'Electrostatics identified as weak area', time: '1 day ago' },
    { type: 'paper', message: 'Personalised paper generated', time: '3 days ago' },
  ];

  return (
    <div className="page-shell">
      <div className="page-max">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-olive-300 bg-olive-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-olive-700">
            <BookMarked size={14} />
            Learning Dashboard
          </div>
          <h1 className="mb-2 font-serif text-4xl md:text-5xl font-bold text-olive-900">
            Good morning, {student.name.split(' ')[0]}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-700">
            Here's your personalized learning overview. Let's make today productive.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Tests Completed"
            value={performance.testsCompleted}
            icon={BarChart3}
            subtitle="This semester"
            trend={2}
            color="primary"
          />
          <SummaryCard
            title="Current Accuracy"
            value={`${Math.round(performance.overallAccuracy)}%`}
            icon={TrendingUp}
            subtitle="Average score"
            trend={5}
            color="success"
          />
          <SummaryCard
            title="Weak Topics"
            value={weakTopics.length}
            icon={Target}
            subtitle="Need attention"
            color="warning"
          />
          <SummaryCard
            title="Syllabus Coverage"
            value="65%"
            icon={Zap}
            subtitle="Preparation level"
            trend={3}
            color="primary"
          />
        </div>

        {/* CTA Banner */}
        <div className="mb-10">
          <Card variant="elevated" className="relative overflow-hidden border-olive-300 bg-gradient-to-br from-olive-50 to-white">
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-olive-300 bg-olive-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-olive-700">
                  <BookMarked size={12} />
                  Ready to practice?
                </div>
                <h2 className="mb-3 font-serif text-3xl md:text-4xl font-bold text-olive-900">
                  Generate Your Practice Paper
                </h2>
                <p className="max-w-lg text-base text-neutral-700">
                  Create a personalized exam practice paper based on your teacher's patterns and weak areas. Start improving today.
                </p>
              </div>
              <Link to="/student/generate-paper" className="flex-shrink-0">
                <Button size="lg" className="gap-2 whitespace-nowrap">
                  Generate Paper
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Focus Areas */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-olive-900">Your Focus Areas</h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-olive-700 bg-olive-100 px-2.5 py-1 rounded">
                {performance.topicWisePerformance.length} Topics
              </span>
            </div>
            <div className="space-y-3">
              {performance.topicWisePerformance.map((topic) => (
                <TopicProgressCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div>
              <h3 className="mb-4 font-serif text-xl font-bold text-olive-900">Recent Activity</h3>
              <Card className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 border-b border-olive-200 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-olive-100 text-olive-700">
                        {activity.type === 'test' && <BarChart3 size={18} />}
                        {activity.type === 'analysis' && <AlertCircle size={18} />}
                        {activity.type === 'paper' && <Zap size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">{activity.message}</p>
                        <p className="mt-1 text-xs uppercase tracking-wider text-neutral-600">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Help CTA */}
            <Card className="bg-gradient-to-br from-olive-50 to-white border-olive-300">
              <div className="text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-olive-200 text-olive-700 mx-auto">
                  <HelpIcon size={20} />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-olive-900">
                  Need Guidance?
                </h3>
                <p className="mb-4 text-sm text-neutral-700">
                  Connect with peers or teachers for instant help
                </p>
                <Link to="/student/doubts">
                  <Button variant="primary" fullWidth size="sm">
                    Get Help
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recommendation */}
            {weakTopics.length > 0 && (
              <Card className="border-olive-300">
                <div className="mb-3 flex items-center gap-2">
                  <Target size={18} className="text-olive-700" />
                  <h3 className="font-serif text-lg font-bold text-olive-900">Recommended</h3>
                </div>
                <p className="mb-4 text-sm text-neutral-700">
                  Focus on <span className="font-semibold text-olive-900">{weakTopics[0]?.name || 'weak areas'}</span>. Your accuracy here is{' '}
                  <span className="font-semibold text-orange-600">{weakTopics[0]?.studentAccuracy || 43}%</span>.
                </p>
                <Link to="/student/generate-paper">
                  <Button variant="secondary" fullWidth size="sm">
                    Practice Weak Areas
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon component for documentation purposes
const HelpIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
