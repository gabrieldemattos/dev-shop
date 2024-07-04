"use client";

import { LogIn } from "lucide-react";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const { data } = useSession();

  if (data?.user) return router.push("/");

  const handleSignInClick = () => signIn("google", { callbackUrl: "/" });

  return (
    <>
      <Header />

      <div className="absolute top-0 flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Bem-vindo, faça login para continuar!
          </h2>
          <Button
            variant="outline"
            className="w-full text-base"
            onClick={handleSignInClick}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Login com Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
