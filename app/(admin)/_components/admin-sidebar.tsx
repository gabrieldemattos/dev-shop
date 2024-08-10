"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import {
  ArrowBigLeft,
  ArrowLeftRight,
  Barcode,
  HomeIcon,
  List,
  LogOut,
  MenuIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuClick = () => setOpenMenu(!openMenu);

  const handleSignOutClick = () => signOut();

  const pathname = usePathname();

  const options = [
    {
      href: "/dashboard",
      icon: <HomeIcon size={20} />,
      label: "Início",
    },
    {
      href: "/dashboard/products",
      icon: <Barcode size={20} />,
      label: "Produtos",
    },
    {
      href: "/dashboard/categories",
      icon: <List size={20} />,
      label: "Categorias",
    },
    {
      href: "/dashboard/orders",
      icon: <ArrowLeftRight size={20} />,
      label: "Pedidos",
    },
  ];

  return (
    <>
      <aside className="hidden h-full w-fit flex-col border-r-2 border-black bg-muted-foreground p-6 lg:flex">
        <h1 className="permanent-marker-regular p-3 text-3xl font-bold text-red-500">
          DEV<span className="text-white">Shop</span>
        </h1>

        <div className="flex flex-1 flex-col gap-3 pt-12 text-base font-bold text-white">
          {options.map((option) => (
            <Button
              key={option.href}
              variant="ghost"
              data-option={pathname === option.href ? "active" : "inactive"}
              className="data-[option=active]:text-white-500 h-fit w-full justify-start gap-2 rounded-full py-3 pl-4 text-lg transition-none hover:bg-transparent data-[option=active]:border-4 data-[option=active]:border-b-0 data-[option=active]:border-t-0 data-[option=active]:border-black data-[option=active]:bg-black data-[option=active]:bg-opacity-30 data-[option=active]:shadow-lg data-[option=active]:hover:text-white"
              asChild
            >
              <Link href={option.href}>
                {option.icon}
                {option.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="link"
            className="h-fit w-fit gap-2 p-0 text-lg text-white"
            asChild
          >
            <Link href="/">
              <ArrowBigLeft size={16} />
              Página Inicial
            </Link>
          </Button>
          <Button
            variant="link"
            className="h-fit w-fit gap-2 p-0 text-lg text-white"
            onClick={handleSignOutClick}
          >
            <LogOut size={16} />
            Sair
          </Button>
        </div>
      </aside>

      <nav className="flex w-full items-center justify-between bg-muted-foreground px-6 py-3 shadow-md lg:hidden">
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="w-fit border-none bg-transparent text-white hover:bg-transparent"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[250px]">
            <SheetHeader>
              <SheetTitle className="mb-5 text-left text-3xl" asChild>
                <h1 className="permanent-marker-regular font-bold text-red-700 text-opacity-70">
                  DEV<span className="text-black">Shop</span>
                </h1>
              </SheetTitle>
              <SheetDescription />

              <div className="flex flex-col space-y-4">
                {options.map((option) => (
                  <Button
                    key={option.href}
                    variant="ghost"
                    data-option={
                      pathname === option.href ? "active" : "inactive"
                    }
                    className="h-fit w-full justify-start gap-2 rounded-full py-3 pl-4 text-xl transition-none hover:bg-transparent data-[option=active]:border-4 data-[option=active]:border-b-0 data-[option=active]:border-t-0 data-[option=active]:border-red-500 data-[option=active]:bg-red-400 data-[option=active]:bg-opacity-30 data-[option=active]:text-red-500"
                    onClick={handleMenuClick}
                    asChild
                  >
                    <Link href={option.href}>
                      {option.icon}
                      {option.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4">
          <Button
            variant="link"
            className="h-fit w-fit gap-2 p-0 text-base text-white"
            asChild
          >
            <Link href="/">Página Inicial</Link>
          </Button>
          <Button
            variant="link"
            className="h-fit w-fit gap-2 p-0 text-base text-white"
            onClick={handleSignOutClick}
          >
            Sair
          </Button>
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;
