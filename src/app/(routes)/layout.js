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




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Theme>
          <div className="flex">
            <div className="bg-gradient-to-t to-black from-white hidden md:block w-56 p-3  shadow-2xl shadow-black h-screen">
              <img  src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png" />
              <DesktopNav/>
            </div>            
            <div className="w-full flex justify-center">
            {children}
            </div>
          </div>
          
         <MobileNav/>
        </Theme>
      </body>
    </html>
  );
}
