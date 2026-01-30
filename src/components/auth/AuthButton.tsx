import { LogOut, Cloud, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

export function AuthButton() {
  const { config, isDark } = useTheme();
  const { user, isLoading, isSyncing, logout, syncToCloud } = useAuthStore();

  if (isLoading) {
    return (
      <button
        disabled
        className={cn(
          'p-2 rounded-lg flex items-center gap-2 text-sm',
          config.selectorBg,
          config.textMuted
        )}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  // Only show if user is logged in (required login means user is always logged in when viewing this)
  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Sync button */}
      <button
        onClick={syncToCloud}
        disabled={isSyncing}
        className={cn(
          'p-2 rounded-lg transition-colors',
          config.selectorBg,
          isSyncing ? config.textMuted : config.textAccent
        )}
        title="Sync to cloud"
      >
        {isSyncing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Cloud className="w-4 h-4" />
        )}
      </button>

      {/* User avatar */}
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || 'User'}
          className="w-7 h-7 rounded-full"
        />
      ) : (
        <div
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
            isDark ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-white'
          )}
        >
          {(user.displayName || user.email || 'U')[0].toUpperCase()}
        </div>
      )}

      {/* Logout button */}
      <button
        onClick={logout}
        className={cn(
          'p-2 rounded-lg transition-colors',
          config.selectorBg,
          config.selectorInactive
        )}
        title="Logout"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
