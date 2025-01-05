import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const categories = [
    "জাতীয়",
    "রাজনীতি",
    "অর্থনীতি",
    "আন্তর্জাতিক",
    "খেলা",
    "বিনোদন",
    "লাইফস্টাইল",
  ]; // Replace with actual categories

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold uppercase mb-4">Get In Touch</h5>
            <p className="mb-2">
              যোগাযোগ: <br />
              ইমেইল: songbadzog@gmail.com
            </p>
            <p className="mb-4">
              মোবাইল: <br />
              ০১৭১১-৫১২২৫০, ০১৭১২-০২৭৩৩৩ ০১৭০৯-৭৮৭৭২২
            </p>
            <div className="flex space-x-2">
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold uppercase mb-4">আর্কাইভ</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pages/sompadoker-kotha"
                  className="hover:text-gray-300"
                >
                  সম্পাদকের কথা
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/nirbahi-sompadoker-kotha"
                  className="hover:text-gray-300"
                >
                  নির্বাহী সম্পাদকের কথা
                </Link>
              </li>
              <li>
                <Link href="/pages/surculation" className="hover:text-gray-300">
                  সার্কুলেশন
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/goponiotar-niti"
                  className="hover:text-gray-300"
                >
                  গোপনীয়তার নীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/amader-somporke"
                  className="hover:text-gray-300"
                >
                  সংবাদ যোগ সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-gray-300">
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gray-300">
                  রিপোর্টার লগইন
                </Link>
              </li>
              <li>
                <Link href="/guest-form" className="hover:text-gray-300">
                  আমাদের লিখুন
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold uppercase mb-4">Categories</h5>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category}`}
                  className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">প্রধান উপদেষ্টা: সাজ্জাদ আলম খান তপু</p>
            <p className="mb-2">উপদেষ্টা: মোঃ আনোয়ারুল হক</p>
            <p className="mb-2">সম্পাদক ও প্রকাশক: মোহাম্মদ আজিজুল মজিদ কাজল</p>
            <p className="mb-2">ভারপ্রাপ্ত সম্পাদক: ইকবাল হাসান কাজল</p>
            <p className="mb-2">
              <a
                href="https://www.facebook.com/profile.php?id=100007687398229"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                নির্বাহী সম্পাদক: কে.এম কাউছার কারাইজ
              </a>
            </p>
            <p className="mb-2">ব্যবস্হাপনা সম্পাদক: মৃণালকান্তি দাস</p>
            <p className="mb-2">বার্তা সম্পাদক: বশির আহমেদ ফারুক</p>
            <p className="mb-4">সহ বার্তা সম্পাদক: মহসীন খান হীরা</p>

            <p className="font-bold mb-2">প্রধান কার্যালয়ঃ</p>
            <p className="mb-4">
              বাড়ি নম্বর- ১৬৩, ৫ম তলা, রোড নম্বর - ৩, সি ব্লক, ইস্টার্ন <br />
              হাউজিং, মিরপুর, ঢাকা।
            </p>

            <p className="font-bold mb-2">বার্তা ও বাণিজ্যিক কার্যালয়:</p>
            <p>
              হাজী জমির উদ্দিন খাঁন সুপার মার্কেট, ঘিওর উপজেলা সদর, ঘিওর,
              মানিকগঞ্জ।
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 mt-8 py-4">
        <p className="text-center text-sm">
          © সংবাদ যোগ কর্তৃক সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>
    </footer>
  );
}
