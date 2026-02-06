'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  alpha,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { FundDailyNav } from '@/types/fund';
import { formatNumber, formatCurrency, formatPercentage, formatDate } from '@/lib/utils/format';

interface FundNavCardProps {
  navData: FundDailyNav;
}

export default function FundNavCard({ navData }: FundNavCardProps) {
  const change = navData.last_val - navData.previous_val;
  const changePercent = navData.previous_val !== 0 
    ? (change / navData.previous_val) * 100 
    : 0;
  const isPositive = change >= 0;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Net Asset Value (NAV)
        </Typography>

        {/* Current NAV */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Current Value
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            {formatCurrency(navData.last_val)}
          </Typography>

          {/* Change */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUp sx={{ color: 'success.main' }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main' }} />
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isPositive ? 'success.main' : 'error.main',
              }}
            >
              {isPositive ? '+' : ''}
              {formatCurrency(change)}
            </Typography>
            <Chip
              label={`${isPositive ? '+' : ''}${formatPercentage(changePercent)}`}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: (theme) =>
                  alpha(
                    isPositive ? theme.palette.success.main : theme.palette.error.main,
                    0.1
                  ),
                color: isPositive ? 'success.main' : 'error.main',
              }}
            />
          </Box>
        </Box>

        {/* Additional Info */}
        <Stack spacing={2}>
          <InfoRow
            label="Previous Value"
            value={formatCurrency(navData.previous_val)}
          />
          <InfoRow
            label="Net Asset"
            value={formatCurrency(navData.net_asset)}
          />
          {navData.nav_date && (
            <InfoRow
              label="NAV Date"
              value={formatDate(navData.nav_date)}
            />
          )}
          {navData.last_upd_date && (
            <InfoRow
              label="Last Updated"
              value={formatDate(navData.last_upd_date)}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}
