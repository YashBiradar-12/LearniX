import React from 'react';
import { Card, Button } from '../components/ui';
import { ArrowUpRight, Search, Users } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const students = [
    { name: 'Student 01', className: 'Physics - Semester 4', score: '78%', status: 'On track' },
    { name: 'Student 02', className: 'Mathematics - Semester 4', score: '84%', status: 'Excellent' },
    { name: 'Student 03', className: 'Chemistry', score: '66%', status: 'Needs support' },
    { name: 'Student 04', className: 'Biology', score: '89%', status: 'Strong' },
  ];

  return (
    <div className="page-shell">
      <div className="page-max space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-label mb-3">Student Management</p>
            <h1 className="font-serif text-4xl md:text-4xl font-bold text-olive-900">Students Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Search size={16} /> Search
            </Button>
            <Button size="sm" className="gap-2">
              Add Student <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: 'Active Learners', value: '1,284' },
            { label: 'High Performers', value: '324' },
            { label: 'At Risk', value: '41' },
          ].map((stat) => (
            <Card key={stat.label} variant="elevated" className="border-olive-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-label">{stat.label}</p>
                  <p className="mt-3 text-4xl font-bold text-neutral-900">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100 text-olive-700 flex-shrink-0">
                  <Users size={20} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Student List */}
        <Card variant="elevated" className="border-olive-300">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-olive-900">Student List</h2>
            <span className="badge-olive text-xs">Updated today</span>
          </div>

          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.name}
                className="flex flex-col gap-4 rounded-lg border border-olive-200 bg-olive-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-neutral-900">{student.name}</p>
                  <p className="text-sm text-neutral-600">{student.className}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-olive-700">{student.score}</span>
                  <span className="badge-olive text-xs">
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
