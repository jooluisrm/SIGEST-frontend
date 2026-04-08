"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { DropDownMenuProfile } from "../header/dropDownMenuProfile";
import { useApiStatus } from "@/hooks/use-api-status";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

export const HeaderPage = () => {
  const { open, isMobile } = useSidebar();
  const [scrolled, setScrolled] = useState(false);
  const { status, loading } = useApiStatus();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 transition-all duration-300",
        open && !isMobile ? "md:left-[16rem] md:w-[calc(100%-16rem)]" : "left-0 w-full"
      )}
    >
      <Card
        className={cn(
          "h-20 rounded-none border-0 border-b p-0 m-0 transition-all duration-300",
          scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent"
        )}
      >
        <div
          className={`container mx-auto px-5 flex justify-between items-center h-full ${
            !open && !isMobile && "md:px-[3rem]"
          }`}
        >
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Image
                alt="logo sigest completo"
                src="/assets/sigest-logo.png"
                width={200}
                height={200}
                priority
                className="w-40 h-14"
              />
            </Link>
            <Badge variant={status?.status === "ok" ? "secondary" : "outline"}>
              {loading ? "API..." : status?.status === "ok" ? "API online" : "API indisponível"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <DropDownMenuProfile />
          </div>
        </div>
      </Card>
    </header>
  );
};
