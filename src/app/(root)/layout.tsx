import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { RootProviders } from "@/components/Providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootProviders>
      <Header />
      <>{children}</>
      <Footer />
    </RootProviders>
  );
}
