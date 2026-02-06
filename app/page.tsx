import { Container, Typography, Box, Stack, alpha, Button } from '@mui/material';
import AppLayout from '@/components/layout/AppLayout';
import FundSearch from '@/components/fund/FundSearch';
import Link from 'next/link';
import { TrendingUp, CompareArrows, Star } from '@mui/icons-material';

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Fund Cat
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: 600, mx: 'auto', mb: 4, fontWeight: 400 }}
            >
              Compare and analyze mutual funds in Thailand with real-time data
            </Typography>

            {/* Search Box */}
            <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              <FundSearch />
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/funds"
                variant="contained"
                size="large"
                startIcon={<TrendingUp />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: (theme) =>
                    `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
                }}
              >
                Browse Funds
              </Button>
              <Button
                component={Link}
                href="/compare"
                variant="outlined"
                size="large"
                startIcon={<CompareArrows />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Compare Funds
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ mb: 8 }}
        >
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
            }}
          >
            <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Real-time Data
            </Typography>
            <Typography color="text.secondary">
              Access up-to-date fund information from SEC Open API
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
              border: (theme) => `1px solid ${alpha(theme.palette.secondary.main, 0.16)}`,
            }}
          >
            <CompareArrows sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Easy Comparison
            </Typography>
            <Typography color="text.secondary">
              Compare multiple funds side-by-side with detailed metrics
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
              border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.16)}`,
            }}
          >
            <Star sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Save Favorites
            </Typography>
            <Typography color="text.secondary">
              Track your favorite funds and view history
            </Typography>
          </Box>
        </Stack>

      </Container>
    </AppLayout>
  );
}
