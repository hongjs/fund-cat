'use client';

import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from '@/contexts/ThemeContext';
import { createAppTheme } from '@/theme/theme';

function ThemeProviderInner({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeModeProvider>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </ThemeModeProvider>
  );
}
