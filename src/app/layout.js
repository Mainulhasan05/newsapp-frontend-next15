import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/Components/Header/Header";
import "./globals.css";
import MoveToTop from "@/Components/moveToTop";
import Footer from "@/Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News Portal",
  description: "Your source for the latest news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-right" />
          <Header />
          {children}
          <Footer />
        </Providers>
        <MoveToTop />
      </body>
    </html>
  );
}
