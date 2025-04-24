import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { MEDIA_URL } from "@/constants/constants";

type ImageUploadProps = {
  image: File | null;
  setImage: (image: File | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const ImageUploader = ({
  image,
  setImage,
  className,
  placeholder,
  disabled = false,
}: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setImage(null);
  };
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
          <div className="flex gap-2">
            <Button type="button" className="w-fit" disabled={disabled}>
              {image ? "Change" : "Upload"}
            </Button>
            {image && (
              <Button
                onClick={handleRemove}
                type="button"
                className="w-fit"
                disabled={disabled}
              >
                Remove
              </Button>
            )}
          </div>
          <span className="text-white">or drag and drop</span>
        </div>
        <div className="w-full flex relative h-full">
          {image || placeholder ? (
            <img
              src={image ? URL.createObjectURL(image) : placeholder}
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
