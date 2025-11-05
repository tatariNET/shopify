"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation} from "@fortawesome/free-solid-svg-icons";
type SocialLink = {
  name: string;
  username: string;
  icon: string;
  url: string;
  color: string;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [isEditing, setIsEditing] = useState(false);
const handleSeeRoute = () => {
    const destLat = 8.998964123447454;
  
    const destLng =38.78718387232911;
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;

    if (!navigator.geolocation) {
      window.open(fallbackUrl, "_blank");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`;
        
        window.open(mapUrl, "_blank");
      },
      (error) => {
        console.error("Geolocation error:", error);
        window.open(fallbackUrl, "_blank");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      name: "Telegram",
      username: "@royalsmart",
      icon: "fa-brands fa-telegram",
      url: "https://t.me/royalsmart",
      color: "hover:text-blue-400",
    },
    {
      name: "Phone",
      username: "+1234567890",
      icon: "fa-solid fa-phone",
      url: "tel:+1234567890",
      color: "hover:text-green-400",
    },
    {
      name: "Email",
      username: "royalsmart.com",
      icon: "fa-solid fa-envelope",
      url: "mailto:support@royalsmart.com",
      color: "hover:text-red-400",
    },
    {
      name: "TikTok",
      username: "@royalsmart",
      icon: "fa-brands fa-tiktok",
      url: "https://www.tiktok.com/@royalsmart",
      color: "hover:text-pink-400",
    },
    {
      name: "Instagram",
      username: "@royalsmart",
      icon: "fa-brands fa-instagram",
      url: "https://www.instagram.com/royalsmart",
      color: "hover:text-purple-400",
    },
  ]);
  
  return (
    <footer className="w-full relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-200">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-[110%] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 pt-8 pb-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Royal Smart Computer
            </h3>
          </div>
          <div className="mx-auto h-0.5 w-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-70" />
          <p className="mt-2 text-slate-400 text-xs max-w-sm mx-auto">
            Connect with us through your favorite platform.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <button
            onClick={() => {
              handleSeeRoute();
            }}
            className="group text-xs sm:text-sm font-medium bg-slate-800/30 cursor-pointer rounded-xl p-3 text-center border border-slate-700/50 transition-all duration-300 hover:bg-slate-800/50 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <p className="text-lg sm:text-xl text-slate-200">
              <FontAwesomeIcon
                icon={faLocation}
                className="p-3 sm:p-3.5 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-sm"
              />
            </p>
            <span className="mt-1.5 block text-slate-300">Bole, alemnesh plaza</span>
          </button>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-xl p-3 text-center border border-slate-700/50 bg-slate-800/30 transition-all duration-300 hover:bg-slate-800/50 hover:shadow-md hover:-translate-y-0.5 ${link.color}`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 group-hover:bg-slate-600/50 ring-1 ring-inset ring-slate-700/40 group-hover:ring-slate-600/40 transition-all duration-300">
                  <i className={`${link.icon} text-lg text-slate-200 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <span className="sr-only">{link.name}</span>
                <span className="text-[11px] sm:text-xs text-slate-300 group-hover:text-white transition-colors duration-300">
                  {link.username}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row items-center justify-between pt-4 text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <i className="fa-regular fa-copyright text-[10px]" />
              <span className="text-gray-400 text-center font-mono">{year} Royal Smart Computer.</span>
            </div>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </footer>
  );
}