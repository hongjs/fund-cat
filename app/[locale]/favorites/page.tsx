import { Suspense } from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import { FundListSkeleton } from '@/components/common/Skeletons';

async function FavoritesList() {
  // This will be client component to read from localStorage
  return <div>Favorites list will be here</div>;
}

export default function FavoritesPage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Favorites
        </Typography>
        <Suspense fallback={<FundListSkeleton count={6} />}>
          <FavoritesList />
        </Suspense>
      </Container>
    </AppLayout>
  );
}
