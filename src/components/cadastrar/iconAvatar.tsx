"use client"

import { usePageType } from "@/context/pageTypeContext";
import Image from "next/image";

export const IconAvatar = () => {

    const { type } = usePageType();

    return (
        <div className="flex mt-10 justify-center items-center">
            <div className="w-35 h-35 p-4 bg-gray-300 rounded-full md:w-50 md:h-50">
                <Image
                    src={`/assets/${type}-icon.png`}
                    alt={`${type} avatar`}
                    width={170}
                    height={170}
                    className="rounded-full w-full h-full"
                    priority={true}
                />
            </div>
        </div>
    );
}