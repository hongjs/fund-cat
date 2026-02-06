'use client';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  alpha,
} from '@mui/material';
import { Star, StarBorder, TrendingUp, TrendingDown } from '@mui/icons-material';
import Link from 'next/link';
import { Fund } from '@/types/fund';
import { formatNumber, formatPercent } from '@/lib/utils/format';

interface FundCardProps {
  fund: Fund;
  isFavorite?: boolean;
  onToggleFavorite?: (projId: string) => void;
}

export default function FundCard({
  fund,
  isFavorite = false,
  onToggleFavorite,
}: FundCardProps) {
  const fundName = fund.proj_name_en;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) =>
            `0 12px 24px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Fund Abbreviation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Chip
            label={fund.proj_abbr_name}
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
            }}
          />
          {onToggleFavorite && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(fund.proj_id);
              }}
              sx={{ ml: 1 }}
            >
              {isFavorite ? (
                <Star sx={{ color: 'warning.main' }} />
              ) : (
                <StarBorder sx={{ color: 'text.secondary' }} />
              )}
            </IconButton>
          )}
        </Box>

        {/* Fund Name */}
        <Link
          href={`/funds/${fund.proj_id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {fundName}
          </Typography>
        </Link>

        {/* Fund Status */}
        {fund.fund_status && (
          <Chip
            label={fund.fund_status}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        )}
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Link
          href={`/funds/${fund.proj_id}`}
          style={{ textDecoration: 'none', width: '100%' }}
        >
          <Box
            sx={{
              width: '100%',
              py: 1,
              px: 2,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              textAlign: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              View Details
            </Typography>
          </Box>
        </Link>
      </CardActions>
    </Card>
  );
}
