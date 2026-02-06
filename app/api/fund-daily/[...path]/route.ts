import { NextRequest, NextResponse } from 'next/server';

const SEC_API_BASE_URL = process.env.SEC_FUND_DAILY_BASE_URL ?? 'https://api.sec.or.th/FundDailyInfo';
const SEC_API_KEY = process.env.SEC_FUND_DAILY_API_KEY || 'e553e512051747478592cbbed99806c9';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathSegments = path || [];
    const pathString = pathSegments.join('/');
    const searchParams = request.nextUrl.searchParams;

    const url = new URL(`${SEC_API_BASE_URL}/${pathString}`);

    // Forward query parameters
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    };

    if (SEC_API_KEY) {
      headers['Ocp-Apim-Subscription-Key'] = SEC_API_KEY;
    }

    // Log curl command for debugging
    const curlHeaders = Object.entries(headers)
      .map(([key, value]) => `-H "${key}: ${value}"`)
      .join(' ');
    console.log(`curl -X GET "${url.toString()}" ${curlHeaders}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    // Handle 204 No Content
    if (response.status === 204) {
      return NextResponse.json({}, { status: 200 });
    }

    // Handle empty responses or non-JSON
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Fund Daily API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fund daily data' },
      { status: 500 }
    );
  }
}
