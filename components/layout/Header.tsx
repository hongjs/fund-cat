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
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useThemeMode } from '@/contexts/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const pages = [
  { label: 'Home', href: '' },
  { label: 'Funds', href: '/funds' },
  { label: 'Compare', href: '/compare' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Recent', href: '/recent' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActivePath = (href: string) => {
    return pathname === href || (href !== '' && pathname.startsWith(href));
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
            href="/"
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
              Fund Cat
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
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                  selected={isActivePath(page.href)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={Link}
            href="/"
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
              Fund Cat
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
                key={page.label}
                component={Link}
                href={page.href}
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
                {page.label}
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
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
