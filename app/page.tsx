import Image from "next/image";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "./_components/header";

export default function Home() {
  return (
    <div className="space-y-8">
      <Header />

      <div className="px-5">
        <Link href="/category/computers-and-laptops">
          <Image
            src="/banner-01.png"
            alt="seu novo computador está aqui, desconto de 30%"
            width={0}
            height={0}
            sizes="100vw"
            quality={100}
            className="h-auto w-full rounded-xl"
          />
        </Link>
      </div>

      <div className="space-y-1 px-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold">Categorias</h2>

          <Link
            href="/categories"
            className="flex items-center gap-1 font-semibold text-muted-foreground"
          >
            <span>Ver mais</span>
            <ChevronRight />
          </Link>
        </div>

        <CategoryList />
      </div>

      <div className="space-y-1 pl-5">
        <h2 className="text-xl font-bold">Ofertas</h2>

        <ProductList />
      </div>
    </div>
  );
}
