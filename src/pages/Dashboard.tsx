import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertCircle,
  Zap,
  ArrowRight,
  Sparkles,
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
    return <div className="p-8 text-slate-200">Error loading data</div>;
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
        <div className="mb-8 flex flex-col gap-4 md:mb-10">
          <div className="inline-flex w-max items-center gap-2 rounded-full border border-violet-200 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-700 dark:border-violet-400/30 dark:text-violet-200">
            <Sparkles size={12} />
            AI study engine
          </div>
          <div>
            <h1 className="text-3xl text-slate-900 dark:text-white md:text-5xl">
              Good morning, {student.name.split(' ')[0]} 👋
            </h1>
            <p className="mt-3 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Ready to prepare smarter?
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Tests Completed" value={performance.testsCompleted} icon={BarChart3} subtitle="This semester" trend={2} color="primary" />
          <SummaryCard title="Current Accuracy" value={`${Math.round(performance.overallAccuracy)}%`} icon={TrendingUp} subtitle="Average score" trend={5} color="success" />
          <SummaryCard title="Weak Topics" value={weakTopics.length} icon={Target} subtitle="Need attention" color="warning" />
          <SummaryCard title="Preparation Level" value="65%" icon={Zap} subtitle="Syllabus coverage" trend={3} color="primary" />
        </div>

        <div className="mb-8">
          <Card variant="elevated" className="hero-panel relative overflow-hidden rounded-[28px] p-6 md:p-8">
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:border-violet-400/30 dark:text-violet-200">
                  <Sparkles size={12} />
                  Next up
                </div>
                <h2 className="mb-3 text-2xl text-slate-900 dark:text-white md:text-4xl">
                  Prepare for your next exam
                </h2>
                <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
                  Generate a personalized practice paper based on your teacher's pattern and your weak areas.
                </p>
              </div>
              <Link to="/generate-paper">
                <Button size="lg" className="whitespace-nowrap">
                  Generate Paper
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 dark:text-white">Your Focus Areas</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Live</span>
            </div>
            <div className="space-y-3">
              {performance.topicWisePerformance.map((topic) => (
                <TopicProgressCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xl text-slate-900 dark:text-white">Recent Activity</h2>
              <Card>
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex gap-3 border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-slate-800/80">
                      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-200">
                        {activity.type === 'test' && <BarChart3 size={18} />}
                        {activity.type === 'analysis' && <AlertCircle size={18} />}
                        {activity.type === 'paper' && <Zap size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-100">{activity.message}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/5 border border-violet-400/20">
              <div className="text-center">
                <h3 className="mb-2 text-xl text-slate-900 dark:text-white">Need help?</h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                  Get instant support from peers or teachers
                </p>
                <Link to="/doubts" className="block w-full">
                  <Button variant="primary" fullWidth size="sm">
                    Connect Now
                  </Button>
                </Link>
              </div>
            </Card>

            <Card>
              <div className="mb-3 flex items-center gap-2">
                <Zap size={18} className="text-amber-600 dark:text-amber-300" />
                <h3 className="text-xl text-slate-900 dark:text-white">Recommended</h3>
              </div>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                Focus on {weakTopics[0]?.name || 'Electrostatics'} next. Your accuracy here is {weakTopics[0]?.studentAccuracy || 43}%.
              </p>
              <Link to="/generate-paper">
                <Button variant="secondary" fullWidth size="sm">
                  Generate Weak-Area Paper
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
