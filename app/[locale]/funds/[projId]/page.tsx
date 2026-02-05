import { Suspense } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import { FundDetailSkeleton, ChartSkeleton } from '@/components/common/Skeletons';

// Server Component for fund details
async function FundDetails({ projId }: { projId: string }) {
  // TODO: Fetch fund details from API
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fund Details: {projId}
      </Typography>
      <Typography color="text.secondary">
        Fund information will be displayed here
      </Typography>
    </Box>
  );
}

// Server Component for fund chart
async function FundChart({ projId }: { projId: string }) {
  // TODO: Fetch NAV history and render chart
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Historical NAV Chart
      </Typography>
      <Typography color="text.secondary">
        Chart will be displayed here
      </Typography>
    </Box>
  );
}

export default function FundDetailPage({ params }: { params: { projId: string } }) {
  const { projId } = params;

  return (
    <AppLayout>
      <Container maxWidth="lg">
        {/* Fund Details with Suspense */}
        <Suspense fallback={<FundDetailSkeleton />}>
          <FundDetails projId={projId} />
        </Suspense>

        {/* Chart with separate Suspense for independent streaming */}
        <Suspense fallback={<ChartSkeleton />}>
          <FundChart projId={projId} />
        </Suspense>
      </Container>
    </AppLayout>
  );
}
