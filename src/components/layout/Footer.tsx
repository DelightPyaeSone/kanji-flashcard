import { motion } from 'framer-motion';
import { Keyboard } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

export function Footer() {
  const { config } = useTheme();

  return (
    <footer className="mt-8 text-center">
      {/* Keyboard Shortcuts Hint */}
      <motion.div
        className={cn('mb-4 flex flex-wrap justify-center gap-2 text-xs', config.footerMuted)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="flex items-center gap-1">
          <Keyboard className="w-3 h-3" />
          Shortcuts:
        </span>
        <span className={cn('px-1.5 py-0.5 rounded', config.keyBg)}>Space</span>
        <span>flip</span>
        <span className={cn('px-1.5 py-0.5 rounded', config.keyBg)}>← →</span>
        <span>navigate</span>
        <span className={cn('px-1.5 py-0.5 rounded', config.keyBg)}>B</span>
        <span>bookmark</span>
      </motion.div>

      {/* Credits */}
      <div className={cn('text-sm space-y-1', config.footerText)}>
        <p>N2 日本語総まとめ 漢字 Flash Card App</p>
        <p>Data source: Hla Hla Htay's Notes</p>
        <p className="text-xs">Special thanks for the valuable learning materials.</p>
      </div>
    </footer>
  );
}
