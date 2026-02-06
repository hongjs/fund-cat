import { Container, Stack, Box, Typography } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import FundSearchClient from '@/components/fund/FundSearchClient';

export default function FundsPage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ py: 4 }}>
          {/* Page Header */}
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Funds
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse and search for mutual funds
            </Typography>
          </Box>

          {/* Search Box */}
          <FundSearchClient />

          {/* Helper Text */}
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              Use the search box above to find and compare funds
            </Typography>
          </Box>
        </Stack>
      </Container>
    </AppLayout>
  );
}
