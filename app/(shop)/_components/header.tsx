"use client";

import {
  HeartIcon,
  HomeIcon,
  LockKeyhole,
  LogInIcon,
  LogOutIcon,
  MapPin,
  MenuIcon,
  ScrollText,
  ShoppingCartIcon,
  UserRound,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui//alert-dialog";
import { Button } from "@/app/_components/ui/button";
import Search from "./search";
import Link from "next/link";
import Cart from "./cart";
import { useCartContext } from "../_hooks/useCartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MenuButton from "./menu-button";
import CategoriesMenu from "./categories-menu";
import { Category } from "@prisma/client";
import { getCategories } from "../_actions/get-categories";
import Image from "next/image";

const Header = () => {
  const [confirmedSignOut, setConfirmedSignOut] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { data } = useSession();

  const { totalProducts } = useCartContext();

  const handleSignInClick = () => signIn();

  const handleSignOutClick = () => signOut();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();

        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative bg-linear-primary px-8 py-5 lg:mb-16 2xl:px-64">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild className="block lg:hidden">
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent text-white hover:bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
              <SheetHeader>
                <SheetTitle className="p-6 text-left">Categorias</SheetTitle>
                <SheetDescription />
              </SheetHeader>

              <div className="space-y-2 pl-2">
                <CategoriesMenu categories={categories} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>

            <Link href="/">
              <p className="permanent-marker-regular text-2xl font-bold text-red-700 text-opacity-70">
                dev<span className="text-white">SHOP</span>
              </p>
            </Link>
          </div>

          <div className="hidden w-[60%] lg:block">
            <Search />
          </div>

          <div className="flex gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-none bg-transparent text-white hover:bg-transparent"
                >
                  <UserRound />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left">
                    {data?.user ? "Sua conta" : "Acesse sua conta"}
                  </SheetTitle>
                  <SheetDescription />
                </SheetHeader>

                {data?.user ? (
                  <div className="flex flex-col">
                    <div className="flex justify-between pt-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={data?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {data.user?.name?.split(" ")[0][0]}
                            {data.user?.name?.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            Olá, {data.user?.name?.split(" ")[0]}
                          </h3>
                          <span className="block text-xs text-muted-foreground">
                            {data.user.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {data.user.isAdmin && (
                      <div className="pt-6">
                        <MenuButton
                          className="text-lg font-bold text-red-500"
                          href="/dashboard"
                          icon={<LockKeyhole size={18} />}
                          label="Painel de Admin"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-10">
                    <h2 className="font-semibold">Faça login para continuar</h2>
                    <Button size="icon" onClick={handleSignInClick}>
                      <LogInIcon />
                    </Button>
                  </div>
                )}

                <div className="py-6">
                  <Separator />
                </div>

                <div className="space-y-2">
                  <MenuButton
                    className="font-semibold"
                    href="/"
                    icon={<HomeIcon size={16} />}
                    label="Início"
                    variant="default"
                  />

                  {data?.user && (
                    <>
                      <MenuButton
                        className="font-normal"
                        href="/my-addresses"
                        icon={<MapPin size={16} />}
                        label="Endereços Cadastrados"
                      />

                      <MenuButton
                        className="font-normal"
                        href="/my-orders"
                        icon={<ScrollText size={16} />}
                        label="Meus Pedidos"
                      />

                      <MenuButton
                        className="font-normal"
                        href="/my-favorites"
                        icon={<HeartIcon size={16} />}
                        label="Favoritos"
                      />

                      <div className="py-4">
                        <Separator />
                      </div>

                      <Button
                        className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                        variant="ghost"
                        onClick={() => setConfirmedSignOut(true)}
                      >
                        <LogOutIcon size={16} />
                        <span className="block">Sair da conta</span>
                      </Button>
                    </>
                  )}
                </div>

                <AlertDialog
                  open={confirmedSignOut}
                  onOpenChange={setConfirmedSignOut}
                >
                  <AlertDialogContent className="w-[400px] rounded-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja sair da sua conta?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOutClick}>
                        Sair
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetContent>
            </Sheet>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="relative border-none bg-transparent text-white hover:bg-transparent"
                >
                  {totalProducts > 0 && (
                    <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-foreground p-1 text-xs font-bold text-background">
                      {totalProducts}
                    </span>
                  )}
                  <ShoppingCartIcon />
                </Button>
              </SheetTrigger>

              <SheetContent className="w-[80vw] bg-[#f3f3f3]" side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">Meu Carrinho</SheetTitle>
                  <SheetDescription />
                </SheetHeader>

                <Cart setIsOpen={setIsCartOpen} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="block lg:hidden">
          <Search />
        </div>
      </div>

      <div className="absolute bottom-[-40px] left-0 hidden w-full animate-[wiggle_1s_ease-in-out] border-y bg-background shadow transition-all lg:flex 2xl:px-64">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            className="block w-full text-center"
            key={category.id}
          >
            <Button
              variant="ghost"
              className="w-full font-semibold text-muted-foreground hover:bg-transparent hover:text-primary"
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
