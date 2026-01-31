import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface CardControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onFlip: () => void;
}

export function CardControls({
  onPrev,
  onNext,
  onFlip,
}: CardControlsProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Prev Button */}
      <button
        onClick={onPrev}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'transition-colors',
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300',
          config.text
        )}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Flip Button */}
      <button
        onClick={onFlip}
        className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center',
          'transition-colors',
          isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-slate-800 hover:bg-slate-700',
          'text-white'
        )}
      >
        <RotateCcw className="w-7 h-7" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'transition-colors',
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300',
          config.text
        )}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
