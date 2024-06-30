import { z } from 'zod';

export async function getPantipMarket() {
  try {
    const response = await fetch(
      'https://pantip.com/api/forum-service/forum/room_pantipmarket?room=all',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'th,en-US;q=0.9,en;q=0.8',
          ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const validatedData = rawData;
    return validatedData;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    if (error instanceof z.ZodError) {
      console.error(
        'Zod validation errors:',
        JSON.stringify(error.errors, null, 2),
      );
    }
    return { data: [] };
  }
}
