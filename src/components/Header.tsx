"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { setSearchQuery } from "../store/searchSlice";
import { RootState, AppDispatch } from "../store/store";
import Image from "next/image";
import { Search } from "lucide-react";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="bg-[#53507c] p-4 flex items-center justify-between flex-wrap lg:flex-nowrap">
      <div className="flex items-center w-full lg:w-1/4 pl-6 mb-4 lg:mb-0">
        <Image
          src="/assets/images/logo-mobile-pantip-white.png"
          alt="Pantip Logo"
          width={60}
          height={60}
        />
        <span className="text-white text-xl lg:text-2xl pl-4 font-bold ml-2">
          Pantip
        </span>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
        <div className="relative w-full max-w-screen-2xl">
          <input
            type="text"
            placeholder="ค้นหาใน Pantip"
            className="w-full p-2 text-center rounded-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-100 bg-[#53507c] rounded-full p-1"
            size={35}
          />
        </div>
      </div>

      <div className="flex items-center text-white justify-end w-full lg:w-1/4">
        <a
          href="https://pantip.com/login"
          className="mr-2 sm:mr-4 text-sm lg:text-base"
        >
          ตั้งกระทู้
        </a>
        <a
          href="https://pantip.com/login"
          className="mr-2 sm:mr-4 text-sm lg:text-base"
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
