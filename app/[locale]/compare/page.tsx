import { Suspense } from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import { FundListSkeleton } from '@/components/common/Skeletons';

async function ComparisonTable() {
  // This will be client component for comparison
  return <div>Comparison table will be here</div>;
}

export default function ComparePage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Compare Funds
        </Typography>
        <Suspense fallback={<FundListSkeleton count={3} />}>
          <ComparisonTable />
        </Suspense>
      </Container>
    </AppLayout>
  );
}
