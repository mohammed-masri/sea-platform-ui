"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AuthPageBanner() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const updateTitle = () => setTitle(document.title);

    // Update title on initial render
    updateTitle();

    // Poll for title changes every 100ms
    const interval = setInterval(() => {
      if (document.title !== title) {
        updateTitle();
      }
    }, 100);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, [title]);

  return (
    <div className="bg-primary-light h-full rounded-bl-3xl overflow-hidden relative flex items-center justify-center">
      <Image
        src="/images/auth-background.png"
        alt="background"
        width={720}
        height={720}
        className="w-full h-full rotate-12 absolute -top-10 right-0 object-cover scale-150"
      />
      <Image
        src="/images/auth-background.png"
        alt="background"
        width={720}
        height={720}
        className="w-full h-full rotate-180 absolute -top-52 left-0 object-cover scale-150"
      />
      <h1 className="text-white text-5xl font-semibold uppercase w-full text-center">
        {title}
      </h1>
    </div>
  );
}
