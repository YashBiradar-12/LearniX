import React, { useState, useEffect } from 'react';
import { User, Settings as SettingsIcon } from 'lucide-react';
import { Card, Button, Badge, LoadingSpinner } from '../components/ui';
import { studentService } from '../services/studentService';
import { authService } from '../services/authService';
import { Student } from '../types';

export const Profile: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const currentUser = authService.getCurrentUser('student');
        const data = await studentService.getStudentProfile(currentUser?.id || 'student_1');
        setStudent({
          ...data,
          name: currentUser?.name || data.name,
          email: currentUser?.email || data.email,
        });
      } catch (error) {
        console.error('Error loading student profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  if (!student) {
    return <div className="p-8">Error loading profile</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-lg text-gray-600">Manage your account and preferences</p>
          </div>
          <Button
            variant={editMode ? 'primary' : 'secondary'}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card variant="elevated">
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {student.name}
                  </h2>
                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined{' '}
                    {new Date(student.joinDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">8</p>
                  <p className="text-sm text-gray-600">Tests</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">132</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">69%</p>
                  <p className="text-sm text-gray-600">Accuracy</p>
                </div>
              </div>
            </Card>

            {/* Courses and Subjects */}
            <Card variant="elevated">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Courses
              </h3>
              <div className="space-y-4">
                {student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Teacher: {course.teacher.name}
                        </p>
                      </div>
                      {course.teacher.patternLearned && (
                        <Badge variant="success" size="sm">
                          Pattern Learned
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1.5">
                          Question Styles:
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {course.teacher.questionStyle.map((style) => (
                            <Badge key={style} variant="primary" size="sm">
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-white p-2 rounded">
                          <p className="font-bold text-gray-900">
                            {course.teacher.difficultyDistribution.easy}%
                          </p>
                          <p className="text-gray-600">Easy</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="font-bold text-gray-900">
                            {course.teacher.difficultyDistribution.intermediate}%
                          </p>
                          <p className="text-gray-600">Intermediate</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="font-bold text-gray-900">
                            {course.teacher.difficultyDistribution.difficult}%
                          </p>
                          <p className="text-gray-600">Difficult</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1.5">
                          Important Topics:
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {course.teacher.importantTopics.map((topic) => (
                            <Badge key={topic} variant="info" size="sm">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card variant="elevated">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SettingsIcon size={20} />
                Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Notification Preferences
                  </label>
                  <div className="space-y-2">
                    {[
                      'Test Reminders',
                      'Performance Updates',
                      'New Helper Available',
                    ].map((pref) => (
                      <label
                        key={pref}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm text-gray-700">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Difficulty Level
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary-600">
                    <option>Adaptive (Recommended)</option>
                    <option>Easy</option>
                    <option>Intermediate</option>
                    <option>Difficult</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Focus Area
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary-600">
                    <option>Weak Areas (Recommended)</option>
                    <option>Full Syllabus</option>
                    <option>Strong Areas</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card variant="elevated" className="bg-primary-50 border-primary-200">
              <h3 className="font-bold text-primary-900 mb-3">About LEARNIX</h3>
              <p className="text-sm text-primary-700 mb-4">
                Your personal exam preparation command center. Powered by AI to
                understand your learning patterns and help you improve faster.
              </p>
              <Button
                variant="secondary"
                fullWidth
                size="sm"
                onClick={() => alert('Sending feedback...')}
              >
                Send Feedback
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
