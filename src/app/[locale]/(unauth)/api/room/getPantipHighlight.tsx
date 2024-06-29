import { z } from 'zod';

const HighlightSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  message: z.string(),
  weight: z.number(),
  image_url: z.array(z.string().url()),
  post_url: z.string().url()
});

const PantipHighlightSchema = z.object({
  data: z.array(HighlightSchema).optional(),
});

export async function getPantipHighlight() {
  try {
    const response = await fetch("https://pantip.com/api/forum-service/home/get_highlight", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "th,en-US;q=0.9,en;q=0.8",
        "ptauthorize": "Basic dGVzdGVyOnRlc3Rlcg==",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const validatedData = PantipHighlightSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', JSON.stringify(error.errors, null, 2));
    }
    return { data: [] };
  }
}
