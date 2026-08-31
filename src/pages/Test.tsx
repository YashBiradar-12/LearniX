import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flag, Send } from 'lucide-react';
import { Card, Button, ProgressBar } from '../components/ui';
import { analysisService } from '../services/analysisService';
import { Paper, TestAttempt } from '../types';

export const Test: React.FC = () => {
  const { paperId: _paperId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const paper = location.state?.paper as Paper | undefined;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<TestAttempt | null>(null);
  const [timeLeft, setTimeLeft] = useState(paper ? paper.duration * 60 : 1200);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (!testStarted || !paper) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, paper]);

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No paper found</h2>
          <Button onClick={() => navigate('/generate-paper')}>
            Generate a Paper
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = paper.questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleAnswerChange = (answer: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestion.id)) {
      newMarked.delete(currentQuestion.id);
    } else {
      newMarked.add(currentQuestion.id);
    }
    setMarkedForReview(newMarked);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < paper.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);
    try {
      const result = await analysisService.analyzeTestPerformance(
        answers,
        paper.id
      );
      setTestResult(result);
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (testResult) {
    return <TestResultsScreen testResult={testResult} paper={paper} />;
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start?</h2>
          <p className="text-gray-600 mb-6">
            {paper.title} • {paper.questions.length} questions • {paper.duration} minutes
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Tips:</strong> Read questions carefully. You can mark questions for review and revisit them later. Make sure to submit before time runs out!
            </p>
          </div>
          <Button
            onClick={() => setTestStarted(true)}
            fullWidth
            size="lg"
            className="mb-3"
          >
            Start Test
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/generate-paper')}
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-gray-900">{paper.title}</h1>
            <div className="flex items-center gap-4">
              <div
                className={`text-lg font-bold ${
                  timeLeft < 300 ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <Button
                onClick={handleSubmitTest}
                isLoading={submitting}
                size="sm"
                className="flex items-center gap-2"
              >
                <Send size={16} />
                Submit
              </Button>
            </div>
          </div>
          <ProgressBar value={currentQuestionIndex + 1} max={paper.questions.length} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card variant="elevated">
              {/* Question */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">
                  Question {currentQuestionIndex + 1} of {paper.questions.length}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {currentQuestion.text}
                </h2>

                {/* Options/Input based on question type */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.type === 'mcq' && currentQuestion.options && (
                    <>
                      {currentQuestion.options.map((option, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            answers[currentQuestion.id] === idx
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={idx}
                            checked={answers[currentQuestion.id] === idx}
                            onChange={(e) =>
                              handleAnswerChange(parseInt(e.target.value))
                            }
                            className="w-4 h-4"
                          />
                          <span className="ml-3 text-gray-900">{option}</span>
                        </label>
                      ))}
                    </>
                  )}

                  {['short-answer', 'long-answer'].includes(currentQuestion.type) && (
                    <textarea
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Enter your answer here..."
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                      rows={currentQuestion.type === 'long-answer' ? 6 : 3}
                    />
                  )}

                  {currentQuestion.type === 'numerical' && (
                    <input
                      type="number"
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Enter numerical answer..."
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    />
                  )}
                </div>

                {/* Mark for Review */}
                <button
                  onClick={handleMarkForReview}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    markedForReview.has(currentQuestion.id)
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Flag size={16} />
                  {markedForReview.has(currentQuestion.id)
                    ? 'Marked for Review'
                    : 'Mark for Review'}
                </button>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={20} />
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === paper.questions.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight size={20} />
                </Button>
                <Button
                  onClick={handleSubmitTest}
                  isLoading={submitting}
                  className="ml-auto flex items-center gap-2"
                >
                  <Send size={20} />
                  Submit Test
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Question Navigation */}
          <div>
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-4 gap-2">
                {paper.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-full aspect-square flex items-center justify-center rounded-lg font-medium text-sm transition-all ${
                      idx === currentQuestionIndex
                        ? 'bg-primary-600 text-white'
                        : answers[q.id] !== undefined
                        ? 'bg-green-100 text-green-700'
                        : markedForReview.has(q.id)
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded border border-green-300"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 rounded border border-yellow-300"></div>
                  <span className="text-gray-600">Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded border border-gray-300"></div>
                  <span className="text-gray-600">Not Attempted</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestResultsScreenProps {
  testResult: TestAttempt;
  paper: Paper;
}

const TestResultsScreen: React.FC<TestResultsScreenProps> = ({
  testResult,
  paper,
}) => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Results Summary */}
        <Card variant="elevated" className="mb-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-900 mb-2">Test Completed! 🎉</h2>
            <p className="text-green-700">Here's how you performed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white rounded-lg">
              <p className="text-4xl font-bold text-primary-600 mb-2">
                {Math.round(testResult.accuracy)}%
              </p>
              <p className="text-gray-600">Overall Accuracy</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <p className="text-4xl font-bold text-green-600 mb-2">
                {testResult.score}/{testResult.totalMarks}
              </p>
              <p className="text-gray-600">Score</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {paper.questions.length}
              </p>
              <p className="text-gray-600">Questions</p>
            </div>
          </div>

          <ProgressBar
            value={testResult.accuracy}
            label="Your Performance"
            size="lg"
          />
        </Card>

        {/* Feedback Section */}
        <div className="mb-8">
          <Button
            onClick={() => setShowFeedback(!showFeedback)}
            variant="outline"
            fullWidth
            size="lg"
          >
            {showFeedback ? 'Hide' : 'View'} Question Difficulty Feedback
          </Button>
        </div>

        {showFeedback && (
          <Card variant="elevated" className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Question Difficulty Assessment
            </h3>
            <div className="space-y-4">
              {testResult.questionFeedback.slice(0, 5).map((feedback, idx) => (
                <div
                  key={feedback.questionId}
                  className="p-4 border-l-4 border-primary-300 bg-gray-50 rounded"
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-medium text-gray-900">Question {idx + 1}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        AI: {feedback.aiEstimatedDifficulty}
                      </span>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-medium">
                        You: {feedback.studentDifficulty}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        Final: {feedback.finalDifficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Student Accuracy</p>
                      <ProgressBar
                        value={feedback.studentAccuracy}
                        size="sm"
                        showPercentage={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/performance')}
            variant="primary"
            fullWidth
            size="lg"
          >
            View Performance
          </Button>
          <Button
            onClick={() => navigate('/generate-paper')}
            variant="secondary"
            fullWidth
            size="lg"
          >
            Generate Another
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            fullWidth
            size="lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
