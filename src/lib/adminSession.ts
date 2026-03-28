import { cookies } from "next/headers";
import { getAdminToken } from "./adminAuth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === getAdminToken();
}
