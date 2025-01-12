import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/Components/Header/Header";
import "./globals.css";
import MoveToTop from "@/Components/moveToTop";
import Footer from "@/Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default:
      "সংবাদ যোগ - সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন ও প্রযুক্তি সংবাদ",
    template: "%s | সংবাদ যোগ",
  },
  description:
    "সংবাদ যোগ: আপনার নির্ভরযোগ্য উৎস সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন, এবং প্রযুক্তি সংবাদ জানতে। আপডেট থাকুন দেশের এবং বিশ্বের খবর নিয়ে।",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://songbadzog.com",
    site_name: "সংবাদ যোগ",
    title:
      "সংবাদ যোগ - সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন ও প্রযুক্তি সংবাদ",
    description:
      "সংবাদ যোগ: আপনার নির্ভরযোগ্য উৎস সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন, এবং প্রযুক্তি সংবাদ জানতে। আপডেট থাকুন দেশের এবং বিশ্বের খবর নিয়ে।",
    images: [
      {
        url: "/images/default.jpg",
        width: 1200,
        height: 630,
        alt: "সংবাদ যোগ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mainul05",
    title:
      "সংবাদ যোগ - সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন ও প্রযুক্তি সংবাদ",
    description:
      "সংবাদ যোগ: আপনার নির্ভরযোগ্য উৎস সর্বশেষ রাজনৈতিক, ব্যবসা, খেলা, বিনোদন, এবং প্রযুক্তি সংবাদ জানতে। আপডেট থাকুন দেশের এবং বিশ্বের খবর নিয়ে।",
    image: "/images/default.jpg",
  },
  images: {
    default: "/images/default.jpg",
  },
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
