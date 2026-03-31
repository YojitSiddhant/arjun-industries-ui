export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "123";
}

export function getAdminToken(): string {
  return process.env.ADMIN_TOKEN ?? "local-admin-token";
}
