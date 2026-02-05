'use client';

import { Suspense } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import AppLayout from '@/components/layout/AppLayout';
import FundSearch from '@/components/fund/FundSearch';
import { FundListSkeleton } from '@/components/common/Skeletons';
import { useRouter, useParams } from 'next/navigation';

// Server Component for fund list
function FundList() {
  // TODO: Fetch funds from API
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body1" color="text.secondary">
        Fund list will be displayed here
      </Typography>
    </Box>
  );
}

export default function FundsPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleSelectFund = (projId: string) => {
    router.push(`/${locale}/funds/${projId}`);
  };

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ py: 4 }}>
          {/* Page Header */}
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              {t('nav.funds')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse and search for mutual funds
            </Typography>
          </Box>

          {/* Search Box */}
          <FundSearch onSelectFund={handleSelectFund} />

          {/* Fund List */}
          <Suspense fallback={<FundListSkeleton count={9} />}>
            <FundList />
          </Suspense>
        </Stack>
      </Container>
    </AppLayout>
  );
}
