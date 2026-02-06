import { NextRequest, NextResponse } from 'next/server';

const SEC_API_BASE_URL = 'https://api.sec.or.th/FundFactsheet';
const SEC_API_KEY = process.env.SEC_FUND_FACTSHEET_API_KEY || '';

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };

  if (SEC_API_KEY) {
    headers['Ocp-Apim-Subscription-Key'] = SEC_API_KEY;
  }

  return headers;
}

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

    const headers = getHeaders();
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Fund Factsheet API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fund factsheet data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathSegments = path || [];
    const pathString = pathSegments.join('/');

    const url = new URL(`${SEC_API_BASE_URL}/${pathString}`);

    let body;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const headers = getHeaders();
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    // Handle 204 No Content
    if (response.status === 204) {
      return NextResponse.json([], { status: 200 });
    }

    // Handle empty responses or non-JSON
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : [];
    } catch {
      data = [];
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Fund Factsheet API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fund factsheet data' },
      { status: 500 }
    );
  }
}
