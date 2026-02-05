'use client';

import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  React.useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 3,
          textAlign: 'center',
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h4" component="h1">
          {t('common.error')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error.message || 'Something went wrong'}
        </Typography>
        <Button variant="contained" onClick={reset} size="large">
          Try Again
        </Button>
      </Box>
    </Container>
  );
}
