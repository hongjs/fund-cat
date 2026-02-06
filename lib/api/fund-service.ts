import { fundFactsheetClient, fundDailyClient } from './client';
import { Fund, FundDailyNav } from '@/types/fund';

/**
 * Server-side API service for fund data
 * These functions should only be called from Server Components or API routes
 */

/**
 * Search funds by name or abbreviation using SEC API search endpoint
 */
export async function searchFunds(query: string): Promise<Fund[]> {
  try {
    // Use SEC's search endpoint - POST /fund with name parameter
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/fund-factsheet/fund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: query }),
    });

    if (!response.ok) {
      console.error('Search API error:', response.status);
      return [];
    }

    const data = await response.json();

    // Response should be an array of funds
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error('Error searching funds:', error);
    return [];
  }
}

/**
 * Get fund details by project ID
 * Uses search API with exact name match
 */
export async function getFundDetail(projId: string): Promise<Fund | null> {
  try {
    const funds = await searchFunds(projId);

    // Find exact match by proj_id
    const fund = funds.find(f => f.proj_id === projId);
    return fund || null;
  } catch (error) {
    console.error(`Error fetching fund detail for ${projId}:`, error);
    return null;
  }
}

/**
 * Get fund NAV (Net Asset Value) data for today
 */
export async function getFundNav(projId: string): Promise<FundDailyNav | null> {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Fetch NAV data using proj_id and today's date
    const response = await fundDailyClient.get(`/${projId}/dailynav/${today}`);

    return response.data || null;
  } catch (error) {
    console.error(`Error fetching NAV for ${projId}:`, error);
    return null;
  }
}


/**
 * Get dividend history for a fund
 */
export async function getFundDividends(projId: string) {
  try {
    const response = await fundDailyClient.get(`/${projId}/dividend`);

    // Response should be an array of dividends
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error(`Error fetching dividends for ${projId}:`, error);
    return [];
  }
}

/**
 * Get list of AMCs (Asset Management Companies)
 */
export async function getAMCList() {
  try {
    const response = await fundDailyClient.get('/amc');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching AMC list:', error);
    return [];
  }
}
