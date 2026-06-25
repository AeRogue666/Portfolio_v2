export default defineEventHandler((event) => {
  setCookie(event, "contact_started", Date.now().toString(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  return { success: true };
});
