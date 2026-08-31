import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { doubtService } from '../services/doubtService';
import { Doubt, Helper } from '../types';
import { mockHelpers } from '../data/mockData';

export const WhoCanHelp: React.FC = () => {
  const [step, setStep] = useState<'form' | 'matching' | 'matched'>('form');
  const [formData, setFormData] = useState({
    subject: 'Physics',
    title: '',
    description: '',
    complexity: 'medium' as 'low' | 'medium' | 'high',
  });
  const [submittedDoubt, setSubmittedDoubt] = useState<Doubt | null>(null);
  const [matchedHelper, setMatchedHelper] = useState<Helper | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitDoubt = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setStep('matching');

    try {
      // Submit doubt
      const doubt = await doubtService.submitDoubt(
        'student_1',
        formData.subject,
        formData.title,
        formData.description,
        formData.complexity
      );
      setSubmittedDoubt(doubt);

      // Find best helper with delay for matching animation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const helper = await doubtService.findBestHelper(doubt, mockHelpers);
      setMatchedHelper(helper);
      setStep('matched');
    } catch (error) {
      console.error('Error submitting doubt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectToHelper = async () => {
    if (submittedDoubt && matchedHelper) {
      setLoading(true);
      try {
        await doubtService.connectToHelper(submittedDoubt.id, matchedHelper.id);
        // Show success state
        setTimeout(() => {
          setStep('form');
          setFormData({
            subject: 'Physics',
            title: '',
            description: '',
            complexity: 'medium',
          });
          setSubmittedDoubt(null);
          setMatchedHelper(null);
        }, 2000);
      } catch (error) {
        console.error('Error connecting to helper:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (step === 'matching' || step === 'matched') {
    return <MatchingState step={step} helper={matchedHelper} onConnect={handleConnectToHelper} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Who Can Help Me?</h1>
          <p className="text-lg text-gray-600">Don't search. Get routed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What are you stuck on?
              </h2>

              <div className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  >
                    <option>Physics</option>
                    <option>Mathematics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., How to solve Gauss's Law problems?"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Describe your doubt
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Explain what you're struggling with..."
                    rows={5}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>

                {/* Complexity */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Complexity Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'Simple' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'Complex' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            complexity: option.value as any,
                          })
                        }
                        className={`p-3 rounded-lg border-2 transition-all font-medium ${
                          formData.complexity === option.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitDoubt}
                  isLoading={loading}
                  fullWidth
                  size="lg"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  Find Someone
                </Button>
              </div>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* How it works */}
            <Card variant="elevated" className="bg-primary-50 border-primary-200">
              <h3 className="font-bold text-primary-900 mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-primary-700">
                <div className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Submit your doubt</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>System analyzes your question</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>We match you with best helper</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Get instant help</span>
                </div>
              </div>
            </Card>

            {/* Helper Hierarchy */}
            <Card variant="elevated">
              <h3 className="font-bold text-gray-900 mb-4">Helper Types</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <Star size={16} className="text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Senior Student Volunteer
                    </p>
                    <p className="text-xs text-gray-500">Fast response</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <Star size={16} className="text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Junior Teacher
                    </p>
                    <p className="text-xs text-gray-500">Expert guidance</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Senior Teacher
                    </p>
                    <p className="text-xs text-gray-500">Advanced help</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MatchingStateProps {
  step: 'matching' | 'matched';
  helper: Helper | null;
  onConnect: () => void;
  loading: boolean;
}

const MatchingState: React.FC<MatchingStateProps> = ({
  step,
  helper,
  onConnect,
  loading,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      {step === 'matching' && (
        <Card className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="inline-block mb-4">
              <svg
                className="animate-spin h-12 w-12 text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Finding best match...
            </h2>
            <p className="text-gray-600">
              Analyzing expertise and availability...
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-sm">Doubt submitted</span>
            </div>
            <div className="flex items-center gap-2 text-primary-600 animate-pulse">
              <Clock size={18} />
              <span className="text-sm">Analysing</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={18} />
              <span className="text-sm">Finding best match</span>
            </div>
          </div>
        </Card>
      )}

      {step === 'matched' && helper && (
        <Card className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Perfect Match Found! 🎉
            </h2>
          </div>

          {/* Helper Card */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 mb-6 text-center">
            <div className="inline-block bg-white p-3 rounded-full mb-3">
              <MessageSquare size={24} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{helper.name}</h3>
            <Badge variant="primary" size="sm" className="inline-block mb-3">
              {helper.type === 'senior-student'
                ? '👤 Senior Student'
                : helper.type === 'junior-teacher'
                ? '👨‍🏫 Junior Teacher'
                : '👨‍🎓 Senior Teacher'}
            </Badge>

            <div className="flex items-center justify-center gap-1 mb-4 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(helper.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className="text-gray-600 ml-1">{helper.rating}</span>
            </div>

            <div className="bg-white rounded p-3 mb-4">
              <p className="text-xs text-gray-600 mb-2">Expertise:</p>
              <div className="flex gap-1.5 justify-center flex-wrap">
                {helper.expertise.map((exp) => (
                  <Badge key={exp} variant="secondary" size="sm">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-600 mb-2">Response Time: {helper.responseTime}</p>
              <p
                className={`font-medium ${
                  helper.availability ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {helper.availability ? '✓ Available Now' : '⏱️ Will be available soon'}
              </p>
            </div>
          </div>

          {/* Match Reason */}
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Match Reason:</strong> {helper.matchReason}
            </p>
          </Card>

          {/* Action Buttons */}
          <Button
            onClick={onConnect}
            isLoading={loading}
            fullWidth
            size="lg"
            className="flex items-center justify-center gap-2 mb-3"
          >
            <ArrowRight size={20} />
            Connect Now
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => window.location.href = '/doubts'}
          >
            Cancel
          </Button>
        </Card>
      )}
    </div>
  );
};
