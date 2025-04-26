import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  image: File | string | null;
  setImage: (image: File | null) => void;
  className?: string;
  disabled?: boolean;
};

const ImageUploader = ({
  image,
  setImage,
  className,
  disabled = false,
}: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return;
      setImage(acceptedFiles[0]);
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });

  const rendered = useMemo(() => {
    if (!image) return undefined;
    if (typeof image === "object") return URL.createObjectURL(image);
    return image;
  }, [image]);
  return (
    <div
      {...getRootProps({
        onClick: (event) => disabled && event.stopPropagation(),
      })}
      className={cn(
        "bg-[#F4F5F6] border border-double dropzone py-0",
        className
      )}
    >
      <input {...getInputProps({ className: "dropzone" })} disabled />
      <div className="flex gap-2 flex-col items-center relative h-[360px] ">
        <div className="!absolute !z-10  flex flex-col gap-2 justify-center items-center overlay">
          <Button type="button" className="w-fit" disabled={disabled}>
            {rendered ? "Change" : "Upload"}
          </Button>
          <span className="text-white">or drag and drop</span>
        </div>
        <div className="w-full flex relative h-full">
          {rendered ? (
            <img
              src={rendered}
              alt="project"
              className="object-cover w-full h-full"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
