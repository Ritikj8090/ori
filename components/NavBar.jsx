"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import search from "../public/search.svg";
import axios from "axios";
import useImageStore from "@/store/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  // hook to manage local state
  const [images, setImages] = useState([]);
  const [Search, setSearch] = useState("");

  //to manage global state
  const store = useImageStore();

  // to route other page
  const route = useRouter();

  //fetching photo details from flickr
  const fetch = async () => {
    const img = await axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a856b9dec52b4f412babb3c0575f68d7&text=${Search}&per_page=20&page=1000&format=json&nojsoncallback=1`
    );
    setImages(img.data.photos.photo);
  };

  //handle when search value changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetch();
  };

  return (
    <>
      <div className="fixed top-0 left-0 justify-between flex w-full p-5 z-10 bg-black h-20 text-white">
        <div className="flex items-center">
          <Image src={search} height={50} width={20} alt="seach" />
          <span
            className="font-extrabold text-2xl tracking-wider cursor-pointer"
            onClick={() => scrollTo(0, 0)}
          >
            Search Photo
          </span>
        </div>
        <div className="relative ">
          <Image
            src={search}
            height={10}
            width={18}
            alt="search"
            className="absolute right-2 top-0.5"
          />
          <input
            type="text"
            placeholder="Seach... "
            className="px-2 rounded-xl text-black"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        {Search.length == 0 ? (
          <></>
        ) : (
          <div className="fixed bg-white h-[400px] w-full z-50 flex flex-wrap gap-2 overflow-y-scroll">
            {images.length == 0 ? (
              <div className="text-black w-full flex items-center justify-center text-3xl font-mono">
                Result Not Found!
              </div>
            ) : (
              <></>
            )}
            {images.map((img) => {
              return (
                <img
                  key={img.id}
                  src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_w.jpg`}
                  alt="photo"
                  className="cursor-pointer"
                  onClick={() => {
                    store.setImage(img.server, img.id, img.secret, img.title);
                    route.push("/image");
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
