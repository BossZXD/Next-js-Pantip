'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between bg-[#53507c] p-4 lg:flex-nowrap">
      <div className="mb-4 flex w-full items-center pl-6 lg:mb-0 lg:w-1/4">
        <Image
          src="/assets/images/logo-mobile-pantip-white.png"
          alt="Pantip Logo"
          width={60}
          height={60}
        />
        <span className="ml-2 pl-4 text-xl font-bold text-white lg:text-2xl">
          Pantip
        </span>
      </div>

      <div className="mb-4 flex w-full justify-center lg:mb-0 lg:w-1/2">
        <div className="relative w-full max-w-screen-2xl">
          <input
            type="text"
            placeholder="ค้นหาใน Pantip"
            className="w-full rounded-full p-2 text-center"
          />
          <Search
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#53507c] p-1 text-gray-100"
            size={35}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-end text-white lg:w-1/4">
        <a
          href="https://pantip.com/login"
          className="mr-2 text-sm sm:mr-4 lg:text-base"
        >
          ตั้งกระทู้
        </a>
        <a
          href="https://pantip.com/login"
          className="mr-2 text-sm sm:mr-4 lg:text-base"
        >
          คอมมูนิตี้
        </a>
        <a href="https://pantip.com/login" className="text-sm lg:text-base">
          เข้าสู่ระบบ / สมัครสมาชิก
        </a>
      </div>
    </header>
  );
};

export default Header;
