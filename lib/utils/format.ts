import { format as dateFnsFormat } from 'date-fns';
import { th, enUS } from 'date-fns/locale';

// Number formatting
export const formatCurrency = (value: number, locale: 'th' | 'en' = 'th'): string => {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number, locale: 'th' | 'en' = 'th', decimals: number = 2): string => {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (value: number, locale: 'th' | 'en' = 'th', decimals: number = 2): string => {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

export const formatCompactNumber = (value: number, locale: 'th' | 'en' = 'th'): string => {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

// Date formatting
export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy', locale: 'th' | 'en' = 'th'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateFnsFormat(dateObj, formatStr, {
      locale: locale === 'th' ? th : enUS,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatDateTime = (date: string | Date, locale: 'th' | 'en' = 'th'): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm', locale);
};

export const formatRelativeTime = (date: string | Date, locale: 'th' | 'en' = 'th'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return locale === 'th' ? 'เมื่อสักครู่' : 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return locale === 'th' ? `${diffInMinutes} นาทีที่แล้ว` : `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return locale === 'th' ? `${diffInHours} ชั่วโมงที่แล้ว` : `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return locale === 'th' ? `${diffInDays} วันที่แล้ว` : `${diffInDays} days ago`;
  }

  return formatDate(dateObj, 'dd/MM/yyyy', locale);
};

// NAV change formatting
export const formatNavChange = (current: number, previous: number): {
  value: number;
  percentage: number;
  isPositive: boolean;
} => {
  const value = current - previous;
  const percentage = previous !== 0 ? (value / previous) * 100 : 0;
  const isPositive = value >= 0;

  return {
    value,
    percentage,
    isPositive,
  };
};

export const formatNavChangeDisplay = (
  current: number,
  previous: number,
  locale: 'th' | 'en' = 'th'
): string => {
  const { value, percentage, isPositive } = formatNavChange(current, previous);
  const sign = isPositive ? '+' : '';
  return `${sign}${formatNumber(value, locale, 4)} (${sign}${formatPercentage(percentage, locale, 2)})`;
};
