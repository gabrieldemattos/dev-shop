"use client";

import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingCartIcon,
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
import { useState } from "react";

const Header = () => {
  const [confirmedSignOut, setConfirmedSignOut] = useState<boolean>(false);

  const { data } = useSession();

  const { totalProducts } = useCartContext();

  const handleSignInClick = () => signIn();

  const handleSignOutClick = () => signOut();

  return (
    <div className="bg-linear-primary px-8 py-3">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
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
                        <h3 className="font-semibold">{data?.user?.name}</h3>
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

              {data?.user && (
                <Button
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  variant="ghost"
                  onClick={() => setConfirmedSignOut(true)}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair da conta</span>
                </Button>
              )}

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

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent text-white hover:bg-transparent"
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

        <Search />
      </div>
    </div>
  );
};

export default Header;
