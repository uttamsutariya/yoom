"use client";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image src={"/icons/hamburger.svg"} alt="menu icon" height={36} width={36} className="cursor-pointer sm:hidden" />
                </SheetTrigger>
                <SheetContent className="bg-dark-1 border-none" side={"left"}>
                    <Link href={"/"} className="flex items-center gap-1">
                        <Image src={"/icons/logo.svg"} alt="Logo" width={32} height={32} />
                        <p className="text-[26px] font-extrabold text-white">Yoom</p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex flex-col h-full gap-6 pt-16 text-white">
                                {_.map(SIDEBAR_LINKS, (link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn("flex items-center gap-4 p-4 rounded-xl w-full max-w-60", {
                                                    "bg-blue-1": isActive,
                                                })}
                                            >
                                                <Image src={link.imgUrl} alt={link.label} width={20} height={20} />
                                                <p className="font-semibold">{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
