import Image from "next/image";

export const LapisBemVindo = () => {
  return (
    <div className="flex gap-0">
      <Image
        width={100}
        height={100}
        src="/assets/miniLapis/lapisAmarelo.png"
        alt=""
        className="w-10 sm:w-10 md:w-13 lg:w-18 h-9 sm:h-12 md:h-16 lg:h-18 p-0 -ml-1 sm:-ml-1 lg:-ml-1.5"
      />
      <Image
        width={100}
        height={100}
        src="/assets/miniLapis/lapisLaranja.png"
        alt=""
        className="w-10 sm:w-10 md:w-13 lg:w-18 h-7 sm:h-10 md:h-14 lg:h-14 p-0 -ml-2 sm:-ml-2 lg:-ml-3"
      />
      <Image
        width={100}
        height={100}
        src="/assets/miniLapis/lapisAzul.png"
        alt=""
        className="w-10 sm:w-10 md:w-13 lg:w-18 h-10 sm:h-14 md:h-18 lg:h-20 p-0 -ml-2 sm:-ml-2 lg:-ml-3"
      />
      <Image
        width={100}
        height={100}
        src="/assets/miniLapis/lapisVermelho.png"
        alt=""
        className="w-10 sm:w-10 md:w-13 lg:w-18 h-7 sm:h-10 md:h-14 lg:h-14 p-0 -ml-2 sm:-ml-2 lg:-ml-3"
      />
      <Image
        width={100}
        height={100}
        src="/assets/miniLapis/lapisVerde.png"
        alt=""
        className="w-10 sm:w-10 md:w-13 lg:w-18 h-9 sm:h-12 md:h-16 lg:h-18 p-0 -ml-2 sm:-ml-2 lg:-ml-3"
      />
    </div>
  );
};
