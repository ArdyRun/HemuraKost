import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export type ContentMap = Record<string, string>;

/**
 * Fetch all editable site content as a key→value map.
 * Cached and revalidated via the "site-content" tag.
 */
export const getSiteContent = unstable_cache(
  async (): Promise<ContentMap> => {
    const rows = await prisma.siteContent.findMany();
    const map: ContentMap = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  },
  ["site-content"],
  { tags: ["site-content"] }
);
