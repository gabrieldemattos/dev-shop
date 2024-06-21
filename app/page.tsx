import Image from "next/image";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="seu novo computador está aqui, desconto de 30%"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
          className="h-auto w-full rounded-xl"
        />
      </div>

      <div className="space-y-1 px-5">
        <h2 className="text-xl font-bold">Categorias</h2>

        <CategoryList />
      </div>

      <div className="space-y-1 pb-10 pl-5">
        <h2 className="text-xl font-bold">Ofertas</h2>

        <ProductList />
      </div>
    </div>
  );
}
