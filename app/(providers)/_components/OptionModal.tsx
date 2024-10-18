"use client";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdAddCircle, IoMdShare } from "react-icons/io";
import { MdOutlineLyrics } from "react-icons/md";

function OptionModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClickCancel = () => {
    closeModal();
  };
  return (
    <div className="fixed w-full h-screen z-20" onClick={handleClickCancel}>
      <div className="fixed bottom-[116px] left-80 w-60 bg-black z-30 rounded-md">
        <ul className="bg-white bg-opacity-20 w-full text-white pb-4 rounded-md">
          <li className="flex gap-x-4 items-center py-4 px-4 hover:bg-white/[0.05]">
            <Link
              href="/노래 디테일 페이지로 이동"
              className="h-14 aspect-square bg-gray-400"
            >
              {/* <img
                className="h-full w-full object-cover"
                src="현재 노래 썸네일"
                alt=""
              /> */}
            </Link>
            <div className="flex flex-col overflow-x-hidden">
              <span className="text-lg line-clamp-1">
                SEVENTEEN 12th Mini Album SPILL THE FEELS{/* {노래 제목} */}
              </span>
              <span className="text-base text-white text-opacity-50 line-clamp-1">
                세븐틴 (SEVENTEEN)
                {/* {가수 이름} */}
              </span>
            </div>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <CiHeart className="text-2xl" />
              좋아요
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <IoMdAddCircle className="text-2xl" />내 플레이리스트 추가
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <MdOutlineLyrics className="text-2xl" />
              가사 보기
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <IoMdShare className="text-2xl" />
              공유
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OptionModal;
