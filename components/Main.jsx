"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import useImageStore from "../store/image";
import { useRouter } from "next/navigation";
import rolling from "../public/Rolling.svg";

const Main = () => {
  // hook to manage local state
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [CurrPage, setCurrPage] = useState(1);
  const [images, setImages] = useState([]);

  //to manage global state
  const store = useImageStore();

  // when page laod then render
  useEffect(() => {
    fetch();
  }, []);

  //fetching photo details from flickr
  const fetch = async () => {
    setLoading(true);
    try {
      const img = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a4a70abe1593b0fea6a1ae0214e89190&per_page=20&page=${CurrPage}&format=json&nojsoncallback=1`
      );
      const newdata = await img.data.photos.photo;

      setImages((images) => [...images, ...newdata]);
      setCurrPage((CurrPage) => CurrPage + 1);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    setLoading(false);
  };

  //when bottom reach then call fetch for next photos
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetch();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="h-full mt-20 flex flex-wrap gap-2">
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
      {loading && (
        <div className="flex w-full justify-center">
          <Image src={rolling} width={50} height={50} alt="loading..." />
        </div>
      )}
    </>
  );
};

export default Main;

/*
71fe7842f0dfd5475bbcb96fd2f03055
ba007f2f665afe68
 */
