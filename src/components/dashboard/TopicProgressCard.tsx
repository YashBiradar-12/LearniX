import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Topic } from '../../types';

interface TopicProgressCardProps {
  topic: Topic;
}

export const TopicProgressCard: React.FC<TopicProgressCardProps> = ({ topic }) => {
  const difficultyColors = {
    weak: 'danger',
    'needs-practice': 'warning',
    good: 'info',
    strong: 'success',
  } as const;

  const difficultyLabels = {
    weak: 'Weak',
    'needs-practice': 'Needs Practice',
    good: 'Good',
    strong: 'Strong',
  } as const;

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-neutral-900">{topic.name}</h4>
        <Badge variant={difficultyColors[topic.difficulty]}>
          {difficultyLabels[topic.difficulty]}
        </Badge>
      </div>
      <ProgressBar
        value={topic.studentAccuracy}
        label={`Accuracy: ${topic.studentAccuracy}%`}
        size="sm"
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-neutral-600">
        {topic.questionsAttempted} questions attempted
      </p>
    </Card>
  );
};
