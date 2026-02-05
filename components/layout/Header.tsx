'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useThemeMode } from '@/contexts/ThemeContext';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const pages = [
  { key: 'home', href: '' },
  { key: 'funds', href: '/funds' },
  { key: 'compare', href: '/compare' },
  { key: 'favorites', href: '/favorites' },
  { key: 'recent', href: '/recent' },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
    handleCloseLangMenu();
  };

  const isActivePath = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href !== '' && pathname.startsWith(fullPath));
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 'none',
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(6px)',
        borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* Logo - Desktop */}
          <Box
            component={Link}
            href={`/${locale}`}
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                }}
              >
                FC
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: -0.5,
              }}
            >
              {t('common.appName')}
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.key}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={`/${locale}${page.href}`}
                  selected={isActivePath(page.href)}
                >
                  <Typography textAlign="center">{t(`nav.${page.key}`)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={Link}
            href={`/${locale}`}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.125rem',
                }}
              >
                FC
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: '1.125rem',
              }}
            >
              {t('common.appName')}
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <Button
                key={page.key}
                component={Link}
                href={`/${locale}${page.href}`}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 1.5,
                  position: 'relative',
                  ...(isActivePath(page.href) && {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t(`nav.${page.key}`)}
              </Button>
            ))}
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: 'text.primary',
                width: 40,
                height: 40,
              }}
              aria-label={t('theme.toggle')}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton
              onClick={handleOpenLangMenu}
              sx={{
                color: 'text.primary',
                width: 40,
                height: 40,
              }}
              aria-label={t('language.switch')}
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 120,
                },
              }}
            >
              <MenuItem
                onClick={() => switchLocale('th')}
                selected={locale === 'th'}
                sx={{ borderRadius: 1, mx: 1 }}
              >
                {t('language.th')}
              </MenuItem>
              <MenuItem
                onClick={() => switchLocale('en')}
                selected={locale === 'en'}
                sx={{ borderRadius: 1, mx: 1 }}
              >
                {t('language.en')}
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
