import { NextRequest, NextResponse } from 'next/server';
import { searchFunds } from '@/lib/api/fund-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchFunds(query);
    
    // Limit results to top 10
    const limitedResults = results.slice(0, 10);

    return NextResponse.json({ results: limitedResults });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search funds' },
      { status: 500 }
    );
  }
}
