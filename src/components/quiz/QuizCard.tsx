import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface QuizChoice {
  text: string;
  isCorrect: boolean;
}

interface QuizCardProps {
  question: string;        // The kanji/word to show
  reading?: string;        // Optional reading
  choices: QuizChoice[];
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({
  question,
  reading,
  choices,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  const { config, isDark } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setShowResult(false);
  }, [question, questionNumber]);

  const handleSelect = (index: number) => {
    if (showResult) return; // Already answered

    setSelectedIndex(index);
    setShowResult(true);

    const isCorrect = choices[index].isCorrect;

    // Auto advance after delay
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <motion.div
        className={cn(
          'rounded-xl p-6 text-center',
          isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress */}
        <div className={cn('text-xs mb-4', config.textMuted)}>
          Question {questionNumber} of {totalQuestions}
        </div>

        {/* Question (Kanji/Word) */}
        <div className={cn('text-5xl font-bold mb-2', config.text)}>
          {question}
        </div>

        {/* Reading hint */}
        {reading && (
          <div className={cn('text-lg', config.textMuted)}>
            {reading}
          </div>
        )}

        {/* Prompt */}
        <div className={cn('text-sm mt-4', config.textMuted)}>
          အဓိပ္ပါယ် ရွေးပါ
        </div>
      </motion.div>

      {/* Choices */}
      <div className="space-y-3">
        {choices.map((choice, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectChoice = choice.isCorrect;

          let buttonStyle = '';
          if (showResult) {
            if (isCorrectChoice) {
              buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
            } else if (isSelected && !isCorrectChoice) {
              buttonStyle = 'bg-red-500/20 border-red-500 text-red-400';
            } else {
              buttonStyle = isDark
                ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                : 'bg-slate-100 border-slate-200 text-slate-400';
            }
          } else {
            buttonStyle = isDark
              ? 'bg-slate-900 border-slate-800 hover:border-cyan-500 hover:bg-slate-800'
              : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50';
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={cn(
                'w-full p-4 rounded-xl border text-left',
                'transition-all flex items-center justify-between',
                buttonStyle,
                config.text
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <span className="text-base">{choice.text}</span>

              {/* Result icon */}
              {showResult && isCorrectChoice && (
                <Check className="w-5 h-5 text-emerald-500" />
              )}
              {showResult && isSelected && !isCorrectChoice && (
                <X className="w-5 h-5 text-red-500" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
