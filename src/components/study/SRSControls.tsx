import { motion } from 'framer-motion';
import type { SRSGrade } from '@/types';
import { getGradeLabel } from '@/services/srs';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface SRSControlsProps {
  onGrade: (grade: SRSGrade) => void;
}

const grades: SRSGrade[] = [0, 1, 2, 3, 4, 5];

export function SRSControls({ onGrade }: SRSControlsProps) {
  const { config, isDark, isSakura } = useTheme();

  const getGradeStyle = (grade: SRSGrade) => {
    if (grade <= 2) return config.gradeHard;
    if (grade === 3) return config.gradeGood;
    return config.gradeEasy;
  };

  return (
    <div className="space-y-3">
      <p className={cn('text-center text-sm', config.textMuted)}>
        ဘယ်လောက်မှတ်မိလဲ? (0-5 key သုံးပါ)
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {grades.map((grade) => (
          <motion.button
            key={grade}
            onClick={() => onGrade(grade)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              'backdrop-blur-sm',
              isDark ? 'border border-white/10' : '',
              getGradeStyle(grade)
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-bold mr-1">{grade}</span>
            <span className="text-xs opacity-80">{getGradeLabel(grade)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
