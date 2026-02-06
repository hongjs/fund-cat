import { Suspense } from 'react';
import { Container, Typography, Box, Stack, Grid } from '@mui/material';
import { notFound } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import FundDetailCard from '@/components/fund/FundDetailCard';
import FundNavCard from '@/components/fund/FundNavCard';
import { FundDetailSkeleton } from '@/components/common/Skeletons';
import { getFundDetail, getFundNav } from '@/lib/api/fund-service';

// Server Component for fund details
async function FundDetails({ projId }: { projId: string }) {
  const fund = await getFundDetail(projId);

  if (!fund) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error">
          Fund not found
        </Typography>
      </Box>
    );
  }

  return <FundDetailCard fund={fund} />;
}

// Server Component for NAV data
async function FundNavData({ projId }: { projId: string }) {
  const navData = await getFundNav(projId);

  if (!navData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          NAV data not available
        </Typography>
      </Box>
    );
  }

  return <FundNavCard navData={navData} />;
}

export default async function FundDetailPage({
  params,
}: {
  params: Promise<{ projId: string }>;
}) {
  const { projId } = await params;

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ py: 4 }}>
          {/* Fund Details */}
          <Suspense fallback={<FundDetailSkeleton />}>
            <FundDetails projId={projId} />
          </Suspense>

          {/* NAV Data */}
          <Suspense fallback={<FundDetailSkeleton />}>
            <FundNavData projId={projId} />
          </Suspense>

          {/* TODO: Add Chart Component */}
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Historical chart will be displayed here
            </Typography>
          </Box>
        </Stack>
      </Container>
    </AppLayout>
  );
}
