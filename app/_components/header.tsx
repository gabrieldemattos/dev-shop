"use client";

import {
  HeartIcon,
  HomeIcon,
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
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

const Header = () => {
  const [confirmedSignOut, setConfirmedSignOut] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  console.log(totalProducts);

  return (
    <div className="bg-linear-primary px-8 py-3">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent text-white hover:bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">Categorias</SheetTitle>
              </SheetHeader>

              <div className="space-y-2 pt-6">
                <CategoriesMenu categories={categories} />
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

          <Link href="/">
            <p className="text-2xl font-bold text-red-700 text-opacity-70">
              DEV<span className="text-white">Shop</span>
            </p>
          </Link>

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
                </SheetHeader>

                {data?.user ? (
                  <>
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
                  </>
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
                        href="/"
                        icon={<MapPin size={16} />}
                        label="Meus Endereços"
                      />

                      <MenuButton
                        className="font-normal"
                        href="/"
                        icon={<ScrollText size={16} />}
                        label="Meus Pedidos"
                      />

                      <MenuButton
                        className="font-normal"
                        href="/"
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

            <Sheet>
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
                </SheetHeader>

                <Cart />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Search />
      </div>
    </div>
  );
};

export default Header;
