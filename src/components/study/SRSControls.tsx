import type { SRSGrade } from '@/types';
import { getGradeLabel } from '@/services/srs';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface SRSControlsProps {
  onGrade: (grade: SRSGrade) => void;
}

const grades: SRSGrade[] = [0, 1, 2, 3, 4, 5];

export function SRSControls({ onGrade }: SRSControlsProps) {
  const { config } = useTheme();

  const getGradeStyle = (grade: SRSGrade) => {
    if (grade <= 2) return config.gradeHard;
    if (grade === 3) return config.gradeGood;
    return config.gradeEasy;
  };

  return (
    <div className="space-y-3">
      <p className={cn('text-center text-sm', config.textMuted)}>
        How well did you know it? (Press 0-5)
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => onGrade(grade)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              getGradeStyle(grade)
            )}
          >
            <span className="font-bold mr-1">{grade}</span>
            <span className="text-xs opacity-80">{getGradeLabel(grade)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
