import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/fund-daily/:path*",
        destination: "https://api.sec.or.th/FundDailyInfo/:path*",
      },
      {
        source: "/api/fund-factsheet/:path*",
        destination: "https://api.sec.or.th/FundFactsheet/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
