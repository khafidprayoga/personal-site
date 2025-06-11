export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const currentPostPath = body.currentPostPath;

  if (!currentPostPath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Current post path is required",
    });
  }

  const posts = await queryCollectionItemSurroundings(
    event,
    "content",
    currentPostPath,
    {
      before: 1,
      after: 1,
    }
  )
    .where("published", "=", true)
    .order("date", "DESC");

  return posts;
});
