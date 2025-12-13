import Image from "next/image";
import { ItemLiDashboard } from "./itemLiDashboard";

export const HeaderDashboard = () => {
    return (
        <header className="flex justify-between items-center">
            <div className="relative inline-block">
                <Image
                    alt="img lapis"
                    src={'/assets/lapis-laranja.png'}
                    width={419}
                    height={141}
                    className="w-[400px] h-20 -translate-x-2"
                />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-[62%] -translate-y-1/2 text-text1 text-xl sm:text-3xl md:text-5xl text-nowrap font-bold">
                    Bem Vindo!
                </h1>
            </div>
            <nav className="pr-5">
                <ul className="flex items-center gap-5">
                    <ItemLiDashboard url="" type=""/>
                    <ItemLiDashboard url="" type=""/>
                    <ItemLiDashboard url="" type="user"/>
                </ul>
            </nav>
        </header>
    );
}