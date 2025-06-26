import Image from "next/image";
import Link from "next/link";

type Props = {
    type?: string;
    url: string;
}

export const ItemLiDashboard = ({ type, url }: Props) => {
    return (
        <Link href={url}>
            <li className="w-[50px] h-[50px] rounded-full bg-[#D9D9D9] flex justify-center items-center">
                {
                    type === "user" && (
                        <Image
                            alt="avatar"
                            height={30}
                            width={30}
                            src={'/assets/avatar-icon.png'}
                        />
                    )
                }
            </li>
        </Link>
    );
}