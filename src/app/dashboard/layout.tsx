"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconTags,
    IconTagPlus,
    IconLogout2
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import LogoSmall from "../../images/logos/small.jpg"
import LogoLarge from "../../images/logos/large.png"
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true); // sidebar open by default

    const links = [
        {
            label: "Offers",
            href: "/dashboard",
            icon: <IconTags className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
        },
        {
            label: "New Offer",
            href: "/dashboard/new-offer",
            icon: <IconTagPlus className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
        },
        {
            label: "Logout",
            href: "/logout",
            icon: <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
        },
    ]
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden items-center">
                        <Image src={LogoLarge} alt="Logo" height={40} className="mt-2 mr-1"/>
                        <div className="mt-8 flex flex-col gap-2 w-[95%]">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Logo Placeholder
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};