import localFont from "next/font/local";
import "../globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import MobileNav from "../components/MobileNav"
import DesktopNav from "../components/DesktopNav"


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};




export default function RootLayout({ children , post }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Theme>
          <div className="flex h-screen ">
            <div className="bg-gradient-to-b to-violet-600  from-red-400 hidden lg:block w-56 p-3  shadow-2xl shadow-black h-screen sticky top-0">
              <img  src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png" />
              <DesktopNav/>
            </div>            
            <div className="w-full h-full lg:pb-0 pb-16 flex justify-center  ">
              {children}
              {post}
            </div>
          </div>
          
         <MobileNav/>
        </Theme>
      </body>
    </html>
  );
}
