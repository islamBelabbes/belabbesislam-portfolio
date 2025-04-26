import { ClerkProvider } from "@clerk/nextjs";

export default async function RootDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
