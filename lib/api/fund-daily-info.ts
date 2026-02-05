import { fundDailyClient } from './client';
import type { FundDailyNav, FundDividendHistory, FundAMC } from '@/types/fund';

// 01. Get daily NAV for a fund
export const getDailyNav = async (projId: string, navDate: string): Promise<FundDailyNav> => {
  const response = await fundDailyClient.get(`/${projId}/dailynav/${navDate}`);
  return response.data;
};

// 02. Get dividend history for a fund
export const getDividendHistory = async (projId: string): Promise<FundDividendHistory[]> => {
  const response = await fundDailyClient.get(`/${projId}/dividend`);
  return response.data;
};

// 03. Get list of AMCs that send daily data
export const getDailyAMCList = async (): Promise<FundAMC[]> => {
  const response = await fundDailyClient.get('/amc');
  return response.data;
};

// Helper function to get NAV for a range of dates
export const getNavHistory = async (
  projId: string,
  startDate: string,
  endDate: string
): Promise<FundDailyNav[]> => {
  // Note: This would require multiple API calls since the API only supports single date queries
  // For now, this is a placeholder. You might want to implement date range logic
  const navData: FundDailyNav[] = [];
  
  // TODO: Implement date range iteration and multiple API calls
  // For MVP, you might want to call this function multiple times from the component
  
  return navData;
};
