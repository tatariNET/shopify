"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faXmark, faRoute } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md backdrop-blur" : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Royal Computer Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <motion.span
            className="text-lg sm:text-xl font-bold text-blue-600 tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Royal Computer
          </motion.span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#contact"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition"
          >
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            Contact
          </a>

          <button
            onClick={handleSeeRoute}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <FontAwesomeIcon icon={faRoute} className="w-4 h-4" />
            See Route
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-800 hover:text-blue-600 focus:outline-none transition"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 border-t-gray-200 border-t-2 w-[60%] bg-white shadow-lg md:hidden"
        >
          <div className="px-6 py-5 flex flex-col space-y-4">
            <a
              href="#contact"
              className="flex items-center gap-3 text-gray-800 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
              Contact
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                handleSeeRoute();
              }}
              className="flex items-center gap-3 text-gray-800 hover:text-blue-600 font-medium"
            >
              <FontAwesomeIcon icon={faRoute} className="w-4 h-4" />
              See Route
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}