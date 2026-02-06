'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  InputAdornment,
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  alpha,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface FundSearchProps {
  placeholder?: string;
  fullWidth?: boolean;
}

export default function FundSearch({
  placeholder,
  fullWidth = true,
}: FundSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFund = (projId: string) => {
    setShowResults(false);
    setSearchQuery('');
    router.push(`/funds/${projId}`);
  };

  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        placeholder={placeholder || 'Search funds...'}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchResults.length > 0 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: isSearching && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
            '& fieldset': {
              borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),
            },
            '&:hover fieldset': {
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
            },
          },
        }}
      />

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
            zIndex: 1000,
            borderRadius: 2,
            boxShadow: (theme) =>
              `0 12px 24px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
          }}
        >
          <List disablePadding>
            {searchResults.map((fund) => (
              <ListItem key={fund.proj_id} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectFund(fund.proj_id)}
                  sx={{
                    py: 2,
                    px: 2.5,
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {fund.proj_abbr_name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {fund.proj_name_en}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* No Results */}
      {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            p: 3,
            zIndex: 1000,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No funds found
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
