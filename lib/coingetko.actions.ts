'use server'

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY  = process.env.COINGECKO_BASE_API_KEY;

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {

  if (!BASE_URL) {
    throw new Error('Missing COINGECKO_BASE_URL');
  }

  if (!API_KEY) {
    throw new Error('Missing COINGECKO_BASE_API_KEY');
  }

  const query = params
    ? qs.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      })
    : '';

  const url = query
    ? `${BASE_URL}/${endpoint}?${query}`
    : `${BASE_URL}/${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'x-cg-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody =
      await response.json().catch(() => ({}));
    throw new Error(
      `API Error ${response.status}: ${errorBody.error ?? response.statusText}`
    );
  }

  return response.json();
}
