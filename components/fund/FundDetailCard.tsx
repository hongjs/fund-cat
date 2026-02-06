'use client';

import { Card, CardContent, Typography, Box, Chip, Stack, Divider, alpha } from '@mui/material';
import { Fund } from '@/types/fund';

interface FundDetailCardProps {
  fund: Fund;
}

export default function FundDetailCard({ fund }: FundDetailCardProps) {
  const fundName = fund.proj_name_en;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Chip
            label={fund.proj_abbr_name}
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              mb: 2,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {fundName}
          </Typography>
          {fund.fund_status && (
            <Chip
              label={fund.fund_status}
              size="small"
              color={fund.fund_status === 'อนุมัติ' ? 'success' : 'default'}
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Fund Information */}
        <Stack spacing={2}>
          <InfoRow
            label="Project ID"
            value={fund.proj_id}
          />
          <InfoRow
            label="Registration ID"
            value={fund.regis_id}
          />
          {fund.regis_date && (
            <InfoRow
              label="Registration Date"
              value={new Date(fund.regis_date).toLocaleDateString('en-US')}
            />
          )}
          {fund.unique_id && (
            <InfoRow
              label="AMC ID"
              value={fund.unique_id}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
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
