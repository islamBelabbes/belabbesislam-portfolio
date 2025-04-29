import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Images } from "lucide-react";

type ImageUploadProps = {
  gallery: File[];
  setGallery: (image: File[]) => void;
  className?: string;
  disabled?: boolean;
};

const GalleryUploader = ({
  setGallery,
  className,
  disabled = false,
}: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setGallery(acceptedFiles);
    },
    [setGallery]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps({
        onClick: (event) => disabled && event.stopPropagation(),
      })}
      className={cn(
        "dropzone rounded-md w-[200px] aspect-video cursor-pointer flex items-center justify-center border  text-sm gap-1 bg-gray-950/10",
        className
      )}
    >
      <input {...getInputProps({ className: "dropzone" })} disabled />
      <Images />
      add to gallery
    </div>
  );
};

export default GalleryUploader;
