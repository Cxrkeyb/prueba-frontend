import React, { useCallback, useEffect, useState } from "react";

interface RandomImageProps {
  search: string;
}

function RandomImage({ search }: RandomImageProps) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  const updateImage = useCallback(async () => {
    const baseUrl = "https://source.unsplash.com/featured/640x480";
    const url = `${baseUrl}?${search}`;
    const response = await fetch(url);
    const imageUrl = response.url;
    setSrc(imageUrl);
  }, [search]);

  useEffect(() => {
    updateImage();
  }, [updateImage]);

  return (
    <div className="max-w-full">
      {src && (
        <img
          src={src}
          onClick={updateImage}
          alt=""
          className="w-full h-auto cursor-pointer rounded-xl"
        />
      )}
    </div>
  );
}

export default RandomImage;
