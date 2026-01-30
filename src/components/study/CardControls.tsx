import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/common';

interface CardControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onFlip: () => void;
  onKnown: () => void;
  onUnknown: () => void;
  showQuizControls?: boolean;
}

export function CardControls({
  onPrev,
  onNext,
  onFlip,
  onKnown,
  onUnknown,
  showQuizControls = true,
}: CardControlsProps) {
  return (
    <div className="space-y-3">
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onPrev}>
          <ChevronLeft className="w-5 h-5" />
          Prev
        </Button>

        <Button variant="primary" onClick={onFlip}>
          <RotateCcw className="w-5 h-5" />
          Flip
        </Button>

        <Button variant="secondary" onClick={onNext}>
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Quiz Controls */}
      {showQuizControls && (
        <motion.div
          className="flex justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button variant="danger" onClick={onUnknown}>
            <X className="w-5 h-5" />
            Don't Know
          </Button>

          <Button variant="success" onClick={onKnown}>
            <Check className="w-5 h-5" />
            Know
          </Button>
        </motion.div>
      )}
    </div>
  );
}
