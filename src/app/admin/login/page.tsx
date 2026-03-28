import type { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";
import { isAdminAuthenticated } from "@/lib/adminSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const isAuthenticated = await isAdminAuthenticated();
  const { next } = await searchParams;

  if (isAuthenticated) {
    redirect(next || "/admin");
  }

  return (
    <AdminLoginClient />
  );
}





