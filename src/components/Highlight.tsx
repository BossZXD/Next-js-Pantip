"use client";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, setHighlights } from "../store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { scroll } from "../hooks/scroll";

interface JsonDataItem {
  name: string;
  message: string;
  weight: number;
  image_url: string[];
  post_url: string;
}

const jsonData: JsonDataItem[] = [
  {
    name: "[Pantip Point] เตียงนอนไม่ต้อง! เตรียมนอนดึกดูยูโร 2024!! ⚽️",
    message: "",
    weight: 1,
    image_url: [
      "https://ptcdn.info/home_highlight/2024-06/665e86cecaac0a8d7a784b57_ftj2m89oih_200.png",
      "https://ptcdn.info/home_highlight/2024-06/665e86cecaac0a8d7a784b57_ftj2m89oih_400.png",
      "https://ptcdn.info/home_highlight/2024-06/665e86cecaac0a8d7a784b57_ftj2m89oih_1000.png",
    ],
    post_url: "https://pantip.com/s/NafBX",
  },
  {
    name: "ต้อนรับฟุตบอลยูโร 2024 ด้วย “เกมบอล”",
    message: "",
    weight: 3,
    image_url: [
      "https://ptcdn.info/home_highlight/2024-06/66470fa1caac0a97173804f6_mxsex4lszz_200.png",
      "https://ptcdn.info/home_highlight/2024-06/66470fa1caac0a97173804f6_mxsex4lszz_400.png",
      "https://ptcdn.info/home_highlight/2024-06/66470fa1caac0a97173804f6_mxsex4lszz_1000.png",
    ],
    post_url: "https://pantip.com/s/ui136",
  },
  {
    name: "🎧 PANTIP PODCAST 🎧 3 อันดับกระทู้ฮิตบนพันทิปประจำวัน 📊",
    message: "",
    weight: 3,
    image_url: [
      "https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_200.jpg",
      "https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_400.jpg",
      "https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_1000.jpg",
    ],
    post_url: "https://pantip.com/s/rKCro",
  },
  {
    name: "📌 พี่แป้งชวนรีวิว “ผลิตภัณฑ์ดูแลเส้นผมที่ชอบ“ รับ Pantip Point ผลิตภัณฑ์ดูแลเส้นผมแบรนด และหมวกน้องเพี้ยน 🌿",
    message: "",
    weight: 5,
    image_url: [
      "https://ptcdn.info/home_highlight/2024-06/666bf274caac0a7eb727233a_lkjg29rvi7_200.png",
      "https://ptcdn.info/home_highlight/2024-06/666bf274caac0a7eb727233a_lkjg29rvi7_400.png",
      "https://ptcdn.info/home_highlight/2024-06/666bf274caac0a7eb727233a_lkjg29rvi7_1000.png",
    ],
    post_url: "https://pantip.com/s/RZ2DS",
  },
  {
    name: "Pantip Pick of the Year 2023 - รวม 10 สุดยอดกระทู้แห่งปี 2566 ที่ถูกใจทีมงาน Pantip",
    message: "",
    weight: 7,
    image_url: [
      "https://ptcdn.info/home_highlight/2023-12/657823e0caac0aaaeb7ce7f6_t8aa9deoj4_200.png",
      "https://ptcdn.info/home_highlight/2023-12/657823e0caac0aaaeb7ce7f6_t8aa9deoj4_400.png",
      "https://ptcdn.info/home_highlight/2023-12/657823e0caac0aaaeb7ce7f6_t8aa9deoj4_1000.png",
    ],
    post_url: "https://pantip.com/s/sdYOO",
  },
  {
    name: "พันทิปนานุกรม … ชวนมาดู Cover Design วันสำคัญ บนเว็บไซต์ Pantip",
    message: "",
    weight: 20,
    image_url: [
      "https://ptcdn.info/home_highlight/2023-09/64f586c3caac0a43be1e9c04_ohwbqfbnf2_200.jpg",
      "https://ptcdn.info/home_highlight/2023-09/64f586c3caac0a43be1e9c04_ohwbqfbnf2_400.jpg",
      "https://ptcdn.info/home_highlight/2023-09/64f586c3caac0a43be1e9c04_ohwbqfbnf2_1000.jpg",
    ],
    post_url: "https://pantip.com/s/NBe8P",
  },
];

interface HighlightItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const highlights: HighlightItem[] = jsonData.map((item, index) => ({
  id: index + 1,
  title: item.name,
  description: item.message,
  image: item.image_url[0] || "",
  link: item.post_url,
}));

const Highlight: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const highlightState = useSelector(
    (state: RootState) => state.highlight.highlights,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setHighlights(highlights));
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center bg-[#53507c] text-white p-8 md:p-12 lg:p-16">
      <div className="relative w-full max-w-5xl">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-center py-2">
          Highlight
        </h2>
        <div className="relative flex justify-center px-2">
          <button type="button" aria-label="left"
            onClick={() => scroll(scrollRef, "left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button type="button" aria-label="right"
            onClick={() => scroll(scrollRef, "right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-hidden space-x-4 md:space-x-8 lg:space-x-4 justify-start"
          >
            {highlightState.map((highlight) => (
              <a
                key={highlight.id}
                href={highlight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start space-y-2 flex-shrink-0 w-64 sm:w-72 md:w-80 bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-300"
              >
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
                />
                <h3 className="text-sm md:text-md font-bold text-center overflow-hidden text-ellipsis w-full">
                  {highlight.title}
                </h3>
                <p className="text-xs md:text-sm text-center overflow-hidden text-ellipsis w-full">
                  {highlight.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
