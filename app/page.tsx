import Image from "next/image";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";

export default function Home() {
  return (
    <div className="h-screen space-y-8 bg-muted">
      <Header />

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
    </div>
  );
}
