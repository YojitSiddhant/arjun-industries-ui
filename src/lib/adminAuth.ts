export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD must be configured in production.");
  }

  return password ?? "123";
}

export function getAdminToken(): string {
  const token = process.env.ADMIN_TOKEN;
  if (!token && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_TOKEN must be configured in production.");
  }

  return token ?? "local-admin-token";
}
