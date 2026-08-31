import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, BookOpen } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { paperService } from '../services/paperService';
import { Paper } from '../types';

export const GeneratePaper: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<Paper | null>(null);

  const [config, setConfig] = useState({
    paperType: 'practice' as 'practice' | 'unit-test' | 'semester-sample',
    focus: 'weak-areas' as 'full-syllabus' | 'weak-areas' | 'selected-topics',
    difficulty: 'adaptive' as 'easy' | 'intermediate' | 'difficult' | 'adaptive',
    numberOfQuestions: 20,
    questionTypes: ['mcq', 'short-answer', 'numerical'] as string[],
  });

  const handleGeneratePaper = async () => {
    setLoading(true);
    try {
      const paper = await paperService.generatePaper(
        'course_physics',
        config.paperType,
        config.focus,
        config.difficulty,
        config.numberOfQuestions,
        config.questionTypes
      );
      setGeneratedPaper(paper);
    } catch (error) {
      console.error('Error generating paper:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (generatedPaper) {
      navigate(`/test/${generatedPaper.id}`, { state: { paper: generatedPaper } });
    }
  };

  if (generatedPaper) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Success State */}
          <div className="mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center mb-6">
              <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                <BookOpen size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Paper Generated Successfully!
              </h2>
              <p className="text-green-700">
                Your personalized practice paper is ready
              </p>
            </div>

            {/* Paper Preview */}
            <Card variant="elevated">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{generatedPaper.title}</h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">
                    {generatedPaper.questions.length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Questions</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">
                    {generatedPaper.duration} min
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">
                    {generatedPaper.questions.length * 5}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Total Marks</p>
                </div>
              </div>

              {/* Generated From */}
              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-bold text-primary-900 mb-3">Generated From:</p>
                <div className="flex gap-2 flex-wrap">
                  {generatedPaper.generatedFrom.teacherPattern && (
                    <span className="px-3 py-1.5 bg-primary-200 text-primary-700 text-sm rounded-full font-medium">
                      👨‍🏫 Teacher Pattern
                    </span>
                  )}
                  {generatedPaper.generatedFrom.studentWeakness && (
                    <span className="px-3 py-1.5 bg-yellow-200 text-yellow-700 text-sm rounded-full font-medium">
                      📊 Your Weaknesses
                    </span>
                  )}
                  {generatedPaper.generatedFrom.courseMaterial && (
                    <span className="px-3 py-1.5 bg-green-200 text-green-700 text-sm rounded-full font-medium">
                      📚 Course Material
                    </span>
                  )}
                </div>
              </div>

              {/* Question Preview */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Question Preview</h4>
                <div className="space-y-3">
                  {generatedPaper.questions.slice(0, 3).map((q) => (
                    <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Q{q.number}: {q.text.substring(0, 80)}...
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Type: {q.type} | Marks: {q.marks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleStartTest}
                  size="lg"
                >
                  Start Test →
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setGeneratedPaper(null)}
                  size="lg"
                >
                  Generate Another
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generate your paper
          </h1>
          <p className="text-lg text-gray-600">
            Practice questions that match your teacher and your needs.
          </p>
        </div>

        <Card variant="elevated">
          {/* Course Selection */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Course</h3>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <BookOpen size={24} className="text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Physics - Semester 4</p>
                <p className="text-sm text-gray-500">Dr. Rajesh Kumar</p>
              </div>
            </div>
          </div>

          {/* Configuration Sections */}

          {/* Paper Type */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Paper Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'practice', label: 'Practice Test' },
                { value: 'unit-test', label: 'Unit Test' },
                { value: 'semester-sample', label: 'Semester Sample' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setConfig({
                      ...config,
                      paperType: type.value as any,
                    })
                  }
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.paperType === type.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Focus */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'full-syllabus', label: 'Full Syllabus' },
                { value: 'weak-areas', label: 'Weak Areas' },
                { value: 'selected-topics', label: 'Selected Topics' },
              ].map((focus) => (
                <button
                  key={focus.value}
                  onClick={() =>
                    setConfig({
                      ...config,
                      focus: focus.value as any,
                    })
                  }
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.focus === focus.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{focus.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Difficulty</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'easy', label: 'Easy' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'difficult', label: 'Difficult' },
                { value: 'adaptive', label: 'Adaptive' },
              ].map((diff) => (
                <button
                  key={diff.value}
                  onClick={() =>
                    setConfig({
                      ...config,
                      difficulty: diff.value as any,
                    })
                  }
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    config.difficulty === diff.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{diff.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Number of Questions</h3>
            <div className="grid grid-cols-4 gap-3">
              {[10, 20, 30, 40].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setConfig({
                      ...config,
                      numberOfQuestions: num,
                    })
                  }
                  className={`p-3 rounded-lg border-2 transition-all ${
                    config.numberOfQuestions === num
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-center text-gray-900">{num}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Question Types */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Question Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'mcq', label: 'MCQ' },
                { value: 'short-answer', label: 'Short Answer' },
                { value: 'long-answer', label: 'Long Answer' },
                { value: 'numerical', label: 'Numerical' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    const newTypes = config.questionTypes.includes(type.value)
                      ? config.questionTypes.filter((t) => t !== type.value)
                      : [...config.questionTypes, type.value];
                    setConfig({
                      ...config,
                      questionTypes: newTypes,
                    });
                  }}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    config.questionTypes.includes(type.value)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGeneratePaper}
            isLoading={loading}
            fullWidth
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            <Zap size={20} />
            Generate Paper
          </Button>
        </Card>
      </div>
    </div>
  );
};
