import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ItemGridDashboard } from "./itemGridDashboard";
import Image from "next/image";
import { DialogGridGerenciarDashboard } from "./dialogGridGerenciarDashboard";

export const DialogGerenciarDashboard = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ItemGridDashboard text="Gerenciar" type="Cadastrar" bg={1}/>
            </DialogTrigger>
            <DialogContent className="p-0 m-0 overflow-x-hidden border-0 bg-white/60 backdrop-blur">
                <DialogHeader className="pb-10">
                    <DialogTitle className="text-start">
                        <div className="relative inline-block">
                            <Image
                                alt="img lapis"
                                src={'/assets/lapis-verde.png'}
                                width={419}
                                height={141}
                                className="w-[400px] h-20 -translate-x-2"
                            />
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-[62%] -translate-y-1/2 text-text1 text-xl sm:text-3xl md:text-5xl text-nowrap font-bold">
                                Gerenciar
                            </h1>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Selecione uma das opções para Gerenciar.
                    </DialogDescription>
                </DialogHeader>
                <DialogGridGerenciarDashboard />
            </DialogContent>
        </Dialog>
    );
}