import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/common';
import { cn } from '@/utils';

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
    <div className="space-y-4">
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="secondary" onClick={onPrev}>
          <ChevronLeft className="w-5 h-5" />
          နောက်သို့
        </Button>

        <Button variant="primary" onClick={onFlip}>
          <RotateCcw className="w-5 h-5" />
          လှန်ရန်
        </Button>

        <Button variant="secondary" onClick={onNext}>
          ရှေ့သို့
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Quiz Controls */}
      {showQuizControls && (
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="danger" onClick={onUnknown}>
            <X className="w-5 h-5" />
            မသိသေး
          </Button>

          <Button variant="success" onClick={onKnown}>
            <Check className="w-5 h-5" />
            သိပြီ
          </Button>
        </motion.div>
      )}
    </div>
  );
}
