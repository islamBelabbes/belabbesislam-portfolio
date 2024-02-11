import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TImageUploaderProps = {
  image: string | null;
  setImage: (image: string | null) => void;
  className?: string;
};

const ImageUploader = ({ image, setImage, className }: TImageUploaderProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles]);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setImage(null);
  };
  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-[#F4F5F6] border border-double dropzone py-0",
        className
      )}
    >
      <input {...getInputProps({ className: "dropzone" })} />
      <div className="flex gap-2 flex-col items-center relative h-[360px] ">
        <div className="!absolute !z-10  flex flex-col gap-2 justify-center items-center overlay">
          <div className="flex gap-2">
            <Button type="button" className="w-fit">
              {image ? "Change" : "Upload"}
            </Button>
            {image && (
              <Button onClick={handleRemove} type="button" className="w-fit">
                Remove
              </Button>
            )}
          </div>
          <span className="text-white">or drag and drop</span>
        </div>
        <div className="w-full flex relative h-full">
          {image ? (
            <Image src={image} alt="project" fill className="object-cover" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
