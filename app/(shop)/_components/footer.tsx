// const Footer = () => {
//   return (
//     <div className="mt-10 bg-background px-8 py-4 text-center text-xs opacity-75">
//       @ 2024 Copyright{" "}
//       <span className="permanent permanent-marker-regular font-semibold">
//         devSHOP
//       </span>
//     </div>
//   );
// };

import { Separator } from "@/app/_components/ui/separator";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// export default Footer;

const Footer = () => {
  return (
    <div className="mt-10 border-t border-gray-300 bg-background px-4 py-4 md:px-24 2xl:px-80">
      <div className="lg: flex flex-col py-5 lg:flex-row lg:space-x-20">
        <div className="flex w-full flex-col items-center justify-center lg:w-fit lg:items-start lg:justify-between">
          <div className="flex items-center gap-1">
            <div className="relative h-4 w-4 lg:h-8 lg:w-8">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>

            <p className="permanent-marker-regular font-semibold lg:text-lg">
              devSHOP
            </p>
          </div>

          <p className="pb-2 pt-1 text-xs md:text-base lg:text-lg">
            Um projeto completo feito em Nextjs.
          </p>

          <div className="flex gap-1">
            <Link href="https://github.com/gabrieldemattos" target="_blank">
              <Facebook className="h-7 w-7 rounded border p-1 text-gray-400 transition-all hover:border-black lg:h-10 lg:w-10 lg:p-2" />
            </Link>

            <Link href="https://github.com/gabrieldemattos" target="_blank">
              <Instagram className="h-7 w-7 rounded border p-1 text-gray-400 transition-all hover:border-black lg:h-10 lg:w-10 lg:p-2" />
            </Link>

            <Link href="https://github.com/gabrieldemattos" target="_blank">
              <Youtube className="h-7 w-7 rounded border p-1 text-gray-400 transition-all hover:border-black lg:h-10 lg:w-10 lg:p-2" />
            </Link>

            <Link href="https://github.com/gabrieldemattos" target="_blank">
              <Github className="h-7 w-7 rounded border p-1 text-gray-400 transition-all hover:border-black lg:h-10 lg:w-10 lg:p-2" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/gabriel-de-mattos-66a83522a/"
              target="_blank"
            >
              <Linkedin className="h-7 w-7 rounded border p-1 text-gray-400 transition-all hover:border-black lg:h-10 lg:w-10 lg:p-2" />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between lg:w-full">
          <div className="flex flex-col text-xs md:text-base">
            <h2 className="font-bold">Sobre</h2>

            <ul className="mt-3 space-y-1">
              <li>Sobre nós</li>
              <li>Serviços</li>
              <li>Termos de uso</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="flex flex-col text-xs md:text-base">
            <h2 className="font-bold">Serviços</h2>

            <ul className="mt-3 space-y-1">
              <Link href="/my-orders">
                <li>Meus Pedidos</li>
              </Link>
              <li>Perfil</li>
              <li>Pedidos Cancelados</li>
              <li>Estorno</li>
            </ul>
          </div>

          <div className="flex flex-col text-xs md:text-base">
            <h2 className="font-bold">Mobile</h2>

            <div className="mt-3 flex flex-col gap-2">
              <Link href="https://github.com/gabrieldemattos">
                <Image
                  src="/app-store.png"
                  alt="app store download"
                  width={130}
                  height={130}
                  sizes="100%"
                />
              </Link>

              <Link href="https://github.com/gabrieldemattos">
                <Image
                  src="/play-store.png"
                  alt="play store download"
                  width={130}
                  height={130}
                  sizes="100%"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-3 pt-5">
        <Separator />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-xs md:text-base">
          Projeto devSHOP - Copyright © 2024
        </p>

        <div className="py-2 text-xs md:text-base">
          Desenvolvido por{" "}
          <Link
            className="text-blue-500"
            href="https://github.com/gabrieldemattos"
          >
            Gabriel de Mattos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
