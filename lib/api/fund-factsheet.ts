import { fundFactsheetClient } from './client';
import type { Fund, FundPerformance, FundBenchmark, FundPolicy, FundFee, FundAsset, FundSuitability } from '@/types/fund';

// 01. Get list of AMCs
export const getAMCList = async () => {
  const response = await fundFactsheetClient.get('/fund/amc');
  return response.data;
};

// 02. Get funds under AMC management
export const getFundsByAMC = async (uniqueId: string): Promise<Fund[]> => {
  const response = await fundFactsheetClient.get(`/fund/amc/${uniqueId}`);
  return response.data;
};

// 03. Search funds by name
export const searchFunds = async (name: string): Promise<Fund[]> => {
  const response = await fundFactsheetClient.post('/fund', { name });
  return response.data;
};

// 04. Get fund URLs
export const getFundURLs = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/URLs`);
  return response.data;
};

// 05. Get fund IPO info
export const getFundIPO = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/IPO`);
  return response.data;
};

// 06. Get fund investment info
export const getFundInvestment = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/investment`);
  return response.data;
};

// 07. Get fund project type
export const getFundProjectType = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/project_type`);
  return response.data;
};

// 08. Get fund policy
export const getFundPolicy = async (projId: string): Promise<FundPolicy> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/policy`);
  return response.data;
};

// 09. Get fund specification
export const getFundSpecification = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/specification`);
  return response.data;
};

// 10. Get feeder fund info
export const getFeederFundInfo = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/feeder_fund`);
  return response.data;
};

// 11. Get fund redemption info
export const getFundRedemption = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/redemption`);
  return response.data;
};

// 12. Get fund suitability
export const getFundSuitability = async (projId: string): Promise<FundSuitability> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/suitability`);
  return response.data;
};

// 13. Get fund risk
export const getFundRisk = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/risk`);
  return response.data;
};

// 14. Get fund assets
export const getFundAssets = async (projId: string): Promise<FundAsset[]> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/asset`);
  return response.data;
};

// 15. Get fund turnover ratio
export const getFundTurnoverRatio = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/turnover_ratio`);
  return response.data;
};

// 18. Get fund benchmark
export const getFundBenchmark = async (projId: string): Promise<FundBenchmark[]> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/benchmark`);
  return response.data;
};

// 19. Get fund compare
export const getFundCompare = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/fund_compare`);
  return response.data;
};

// 20. Get fund class
export const getFundClass = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/class_fund`);
  return response.data;
};

// 22. Get fund performance
export const getFundPerformance = async (projId: string): Promise<FundPerformance[]> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/performance`);
  return response.data;
};

// 24. Get fund dividend policy
export const getFundDividend = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/dividend`);
  return response.data;
};

// 25. Get fund fees
export const getFundFees = async (projId: string): Promise<FundFee[]> => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/fee`);
  return response.data;
};

// 26. Get fund involved parties
export const getFundInvolveParty = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/InvolveParty`);
  return response.data;
};

// 27. Get fund portfolio
export const getFundPortfolio = async (projId: string, period: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/FundPort/${period}`);
  return response.data;
};

// 28. Get fund full portfolio
export const getFundFullPortfolio = async (projId: string, period: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/FundFullPort/${period}`);
  return response.data;
};

// 29. Get fund top 5 holdings
export const getFundTop5 = async (projId: string, period: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/FundTop5/${period}`);
  return response.data;
};

// 30. Get fund history
export const getFundHistory = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/FundHist`);
  return response.data;
};

// 31. Get fund tracking error
export const getFundTrackingError = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/FundTrackingError`);
  return response.data;
};

// 32. Get fund manager history
export const getFundManagerHistory = async (projId: string) => {
  const response = await fundFactsheetClient.get(`/fund/${projId}/fund_manager`);
  return response.data;
};
