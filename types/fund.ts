// Fund Factsheet API Types

export interface Fund {
  last_upd_date: string;
  proj_id: string;
  regis_id: string;
  regis_date: string;
  cancel_date?: string;
  proj_name_th: string;
  proj_name_en: string;
  proj_abbr_name: string;
  fund_status: 'SE' | 'EX' | 'RG' | 'CA' | 'LI';
  unique_id: string;
  permit_us_investment?: string;
  invest_country_flag?: '1' | '2' | '3' | '4';
}

export interface FundPerformance {
  last_upd_date: string;
  class_abbr_name: string;
  performance_type_desc: string;
  reference_period: string;
  performance_val: string;
  as_of_date: string;
}

export interface FundBenchmark {
  last_upd_date: string;
  group_seq: string;
  benchmark: string;
}

export interface FundPolicy {
  last_upd_date: string;
  policy_desc: string;
  investment_policy_desc?: string;
  management_style: string;
}

export interface FundFee {
  last_upd_date: string;
  class_abbr_name: string;
  fee_type_desc: string;
  rate: string;
  rate_unit: string;
  actual_value: string;
  actual_value_unit?: string;
  fee_other_desc?: string;
}

export interface FundAsset {
  last_upd_date: string;
  asset_seq: string;
  asset_name: string;
  asset_ratio: string;
}

export interface FundSuitability {
  last_upd_date: string;
  risk_spectrum_desc: string;
  risk_spectrum: 'RS1' | 'RS2' | 'RS3' | 'RS4' | 'RS5' | 'RS6' | 'RS7' | 'RS8' | 'RS81';
}

// Fund Daily Info API Types

export interface AmcInfo {
  unique_id: string;
  sell_price: number;
  buy_price: number;
  sell_swap_price: number;
  buy_swap_price: number;
  remark_th: string;
  remark_en: string;
}

export interface FundDailyNav {
  last_upd_date: string;
  nav_date: string;
  class_abbr_name: string;
  net_asset: number;
  last_val: number;
  previous_val: number;
  amc_info: AmcInfo[];
}

export interface FundDividendHistory {
  last_upd_date: string;
  unique_id: string;
  class_abbr_name: string;
  book_close_date: string;
  dividend_date: string;
  dividend_value: number;
}

export interface FundAMC {
  last_upd_date: string;
  unique_id: string;
  name_th: string;
  name_en: string;
}

// Combined types for UI

export interface FundDetail extends Fund {
  dailyNav?: FundDailyNav;
  performance?: FundPerformance[];
  benchmarks?: FundBenchmark[];
  policy?: FundPolicy;
  fees?: FundFee[];
  assets?: FundAsset[];
  suitability?: FundSuitability;
}

export interface FundSearchResult {
  proj_id: string;
  proj_abbr_name: string;
  proj_name_th: string;
  proj_name_en: string;
  fund_status: string;
}
