'use client';

import React from 'react';
import { Skeleton, Card, CardContent, Box, Grid } from '@mui/material';

export function FundCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={60} />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={80} height={36} />
          <Skeleton variant="rectangular" width={80} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
}

export function FundListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <FundCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export function FundDetailSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width="70%" height={48} />
      <Skeleton variant="text" width="40%" height={32} sx={{ mt: 1 }} />
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" height={400} />
      </Box>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
      </Grid>
    </Box>
  );
}

export function ChartSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={400} />
      <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
        {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
          <Skeleton key={period} variant="rectangular" width={60} height={36} />
        ))}
      </Box>
    </Box>
  );
}
