import type { Metadata } from "next";
import TanStackProvider from "@/providers/TanStackProvider";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Find and rent your perfect car with RentalCar.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          <TanStackProvider>
            {children}
            <Toaster position="top-right" />
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
