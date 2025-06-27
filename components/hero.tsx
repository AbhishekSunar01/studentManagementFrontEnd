"use client";
import React from "react";
import Image from "next/image";
import mainLogo from "../public/Spring_Boot.svg.png";

export function Hero() {
  return (
    <div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h4 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0]">
        Wellcome to my project with next.js &
      </h4>
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-[#6DB33F] relative z-20 flex gap-9">
        Springboot
        <Image src={mainLogo} width={150} height={200} alt="Spring Boot Logo" />
      </h1>
      <div className="w-[40rem] mt-6 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#6DB33F] to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#6DB33F] to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-white to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-white to-transparent h-px w-1/4" />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
