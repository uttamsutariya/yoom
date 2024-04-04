"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import _ from "lodash";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className="sticky left-0 top-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {_.map(SIDEBAR_LINKS, (link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn("flex items-center gap-4 p-4 rounded-xl justify-start", {
                                "bg-blue-1": isActive,
                            })}
                        >
                            <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                            <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;
