import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { toast } from "react-toastify";
import { TOAST_IDs } from "@/constants/constants";
import { boolean } from "zod";

type TImageUploaderProps = {
  image: null | string;
  setImage: (image: null | string) => void;
  className?: ClassValue;
  disabled?: boolean;
  [key: string]: any;
};

const ImageUploader = ({
  image,
  setImage,
  className,
  disabled = false,
  ...props
}: TImageUploaderProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
    },
    onDropRejected: (fileRejections) => {
      return toast.error(fileRejections[0].errors[0].message, {
        toastId: TOAST_IDs.fileError,
      });
    },
    onDropAccepted: () => toast.dismiss(TOAST_IDs.fileError),
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
      {...getRootProps({
        onClick: (event) => disabled && event.stopPropagation(),
      })}
      className={cn(
        "bg-[#F4F5F6] border border-double dropzone py-0",
        className
      )}
    >
      <input {...getInputProps({ className: "dropzone", ...props })} disabled />
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
          {image ? (
            <img
              src={image}
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
