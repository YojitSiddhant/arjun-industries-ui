export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin123";
}

export function getAdminToken(): string {
  return process.env.ADMIN_TOKEN ?? "local-admin-token";
}
