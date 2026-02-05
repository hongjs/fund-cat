'use client';

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Stack, Divider, alpha } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: 'auto',
        borderTop: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {t('common.appName')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compare and analyze mutual funds in Thailand
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Data source:{' '}
              <MuiLink
                href="https://api-portal.sec.or.th/"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                SEC Open API
              </MuiLink>
            </Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} {t('common.appName')}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
