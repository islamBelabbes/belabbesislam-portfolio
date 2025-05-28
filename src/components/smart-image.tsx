import { cn } from "@/lib/utils";
import { useState } from "react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  containerClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  skeletonClassName = "bg-gray-200 animate-pulse",
  containerClassName = "object-cover",
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
      {!isLoaded && (
        <div
          className={cn(
            "w-full h-[300px] lg:h-[700px] rounded-md",
            skeletonClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
          {
            "opacity-0 absolute inset-0": !isLoaded,
            "opacity-100 ": isLoaded,
          },
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};
