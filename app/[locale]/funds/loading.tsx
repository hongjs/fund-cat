'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function FundsLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
