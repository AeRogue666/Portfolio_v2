export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (url.pathname.startsWith("/api/admin")) {
    if (process.env.NODE_ENV === "production" && !process.env.DEV_ADMIN) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
      });
    }
  }
});
