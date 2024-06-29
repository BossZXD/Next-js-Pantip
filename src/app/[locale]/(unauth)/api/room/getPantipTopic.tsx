import { z } from 'zod';

const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.object({
    original: z.string().url(),
    large: z.string().url(),
    medium: z.string().url(),
    small: z.string().url(),
  }),
  slug: z.string(),
});

const TagSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const TopicSchema = z.object({
  topic_id: z.number(),
  topic_type: z.number(),
  title: z.string(),
  thumbnail_url: z.string().nullable(),
  views_count: z.number(),
  comments_count: z.number(),
  votes_count: z.number(),
  author: AuthorSchema,
  created_time: z.string(),
  tags: z.array(TagSchema),
  category: z.string(),
}).partial();

const PantipTopicSchema = z.object({
  data: z.array(TopicSchema).optional(),
});

export async function getPantipTopic() {
  try {
    const response = await fetch("https://pantip.com/api/forum-service/home/get_suggest_topic_behavior?tracking_code=rm9nr13oe1kKCSGSC9B8", {
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
    const validatedData = rawData;
    return validatedData;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', JSON.stringify(error.errors, null, 2));
    }
    return { data: [] };
  }
}
