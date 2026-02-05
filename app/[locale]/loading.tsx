'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        {t('common.loading')}
      </Typography>
    </Box>
  );
}
