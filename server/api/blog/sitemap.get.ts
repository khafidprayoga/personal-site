// sitemap for dynamic content (ssr)
export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "content")
    .where("published", "=", true)
    .order("date", "DESC")
    .all();

  const urls: {
    loc: string;
    lastmod: string | Date;
    priority: number;
  }[] = [];

  for (const post of posts.values()) {
    urls.push({
      loc: post.path,
      lastmod: post.date,
      priority: post.pinned ? 1 : 0.8,
    });
  }

  return urls;
});
