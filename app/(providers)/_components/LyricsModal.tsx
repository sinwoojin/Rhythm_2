"use client";

import { useModalStore } from "@/zustand/modalStore";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function LyricsModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClickCancel = () => {
    closeModal();
  };
  return (
    <>
      <div
        className="fixed top-[50%] left-[50%] w-[500px] h-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-8 z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-4xl absolute top-4 right-4"
          onClick={handleClickCancel}
        >
          <IoCloseOutline />
        </button>
        <div className="flex flex-col gap-y-6 w-full h-full">
          <div className="flex gap-x-8 items-center">
            <div className="h-24 aspect-square bg-slate-600"></div>
            <div className="flex flex-col">
              <span className="text-xl">칵테일 사랑</span>
              <span className="text-base text-gray-300">경서</span>
            </div>
          </div>
          <div className="max-h-full overflow-y-auto">
            <p className="w-1/2 text-lg text-white/50 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              veritatis in sit deserunt nulla vel incidunt enim explicabo.
              Repudiandae quam officiis aut pariatur sed officia ratione?
              Voluptas nesciunt saepe quasi? Corrupti reprehenderit tenetur ipsa
              nam consequatur ex, error accusamus quas. Laboriosam suscipit
              blanditiis cum, ex ullam, non iure esse ea quia, qui quam delectus
              fugiat quod autem expedita maxime rem! Neque praesentium, odit
              repellat eveniet autem nam totam pariatur itaque ullam minima
              minus consequatur necessitatibus nobis aspernatur incidunt
              architecto quae distinctio ut deserunt? Porro repudiandae
              doloremque error distinctio placeat. Assumenda! Deserunt debitis
              adipisci, veniam rem nihil eius ut libero dolor suscipit minus ad
              facilis accusantium recusandae earum enim modi a corporis in
              rerum? Provident enim dolorem quod ut quidem aliquid. Aliquid
              mollitia architecto eveniet velit eius ducimus fugiat nisi eos
              voluptatibus, provident quasi, cum atque suscipit officia fuga
              ratione ad dolore? Beatae atque doloremque necessitatibus
              consectetur praesentium? Ab, corrupti omnis. Ullam, delectus.
              Temporibus quo eos tempore, recusandae ea saepe dolor culpa nam
              harum. Unde quas amet atque ut ratione, illo aperiam cupiditate
              eaque quo aut accusamus fugit laborum, iusto numquam! Repellat
              repellendus dolore quo assumenda nisi maxime modi corrupti
              praesentium aperiam, minus ab laboriosam ex vel odio? Dolorum nemo
              rerum neque earum, nam voluptate. Tempora harum itaque delectus
              natus pariatur. Aspernatur mollitia possimus beatae dolorem eos
              obcaecati doloribus, eius quidem in doloremque corporis optio ad
              ducimus sequi est rem necessitatibus, eum consequatur consectetur.
              Sunt, ratione quas quibusdam aut blanditiis tempore. Deleniti
              tenetur veniam illum magni minima suscipit praesentium
              reprehenderit molestias est ducimus. Tempora eos mollitia facere
              adipisci eligendi vitae, nemo, quibusdam, ullam similique
              doloremque veritatis numquam incidunt dolorem minus rerum.
              Nesciunt omnis dolorem, debitis consequatur error maiores? Odit at
              adipisci repellat, voluptatem architecto nulla harum quis magni
              quidem autem quod tempora eligendi aliquam dignissimos fugiat
              ratione itaque a. Quia, earum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LyricsModal;
