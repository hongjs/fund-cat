import { Suspense } from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import { FundListSkeleton } from '@/components/common/Skeletons';

async function RecentList() {
  // This will be client component to read from localStorage
  return <div>Recent views list will be here</div>;
}

export default function RecentPage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Recently Viewed
        </Typography>
        <Suspense fallback={<FundListSkeleton count={6} />}>
          <RecentList />
        </Suspense>
      </Container>
    </AppLayout>
  );
}
