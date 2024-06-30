import { z } from 'zod';

const CategoriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_en: z.string(),
  description: z.string(),
  is_pinned: z.boolean(),
  link_url: z.string().url(),
  order: z.number().nullable(),
  pinned_time: z.number().nullable(),
  room_icon_url: z.string().url(),
  slug: z.string(),
});

const PantipCategoriesSchema = z.object({
  data: z.array(CategoriesSchema).optional(),
});

export async function getPantipCategories() {
  try {
    const response = await fetch(
      'https://pantip.com/api/forum-service/home/get_room_recommend?tracking_code=%7Brm9nr13oe1kKCSGSC9B8%7D',
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
    const validatedData = PantipCategoriesSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.log('Error fetching or parsing data:', error);
    return { data: [] };
  }
}
