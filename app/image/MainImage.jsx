"use client"
import useImageStore from "@/store/image";
import React from "react";

const MainImage = () => {
  const store = useImageStore();

  const handleDownload = () => {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = `https://live.staticflickr.com/${store.server}/${store.id}_${store.secret}_w.jpg`;
    anchor.download = 'downloaded-image.jpg'; // Suggested filename for the downloaded image
    anchor.click();
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="text-2xl font-extrabold">{store.title}</div>
      <img
        src={`https://live.staticflickr.com/${store.server}/${store.id}_${store.secret}_w.jpg`}
        alt="photo"
        
      />
      <button className="bg-green-400 p-2 rounded-2xl mt-5 hover:bg-green-600" onClick={handleDownload}>Download</button>
    </div>
  );
};

export default MainImage;
