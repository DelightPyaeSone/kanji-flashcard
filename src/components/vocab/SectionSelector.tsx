import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface SectionSelectorProps {
  sections: string[];
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

export function SectionSelector({
  sections,
  selectedSection,
  onSelectSection,
}: SectionSelectorProps) {
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sections.map((section) => (
        <motion.button
          key={section}
          onClick={() => onSelectSection(section)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm transition-all duration-300',
            selectedSection === section
              ? cn(
                  'text-white shadow-lg',
                  isSakura
                    ? 'bg-rose-400/80 shadow-rose-400/30'
                    : 'bg-blue-500/80 shadow-blue-500/30'
                )
              : isDark
                ? 'bg-white/5 hover:bg-white/15 text-white/70'
                : isSakura
                  ? 'bg-white/50 hover:bg-white/70 text-rose-600 shadow-sm'
                  : 'bg-white/50 hover:bg-white/70 text-slate-600 shadow-sm'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {section}
        </motion.button>
      ))}
    </div>
  );
}
