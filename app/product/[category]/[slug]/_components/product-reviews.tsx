import { Button } from "@/app/_components/ui/button";
import { ChevronRight, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductReviews = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Última avaliação</h2>

        <Link
          href="#"
          className="flex items-center gap-1 font-semibold text-muted-foreground"
        >
          <span>Ver mais</span>
          <ChevronRight />
        </Link>
      </div>

      <div className="space-y-2">
        <p className="text-base font-bold">Nome</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Star className="fill-primary text-primary" size={15} />
            <Star className="fill-primary text-primary" size={15} />
            <Star className="fill-primary text-primary" size={15} />
            <Star className="fill-primary text-primary" size={15} />
            <Star className="fill-primary text-primary" size={15} />
          </div>

          <span className="text-xs font-semibold text-gray-400">
            21 de Jan, 2024
          </span>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
            malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor,
            ut gravida odio iaculis a. Nulla risus justo, tempor eu felis eu,
            efficitur pulvinar risus.
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-2">
        <p className="text-xs font-light text-muted-foreground">
          2 pessoas acharam esta avaliação útil
        </p>

        <Button variant="ghost" className="gap-2 p-0 text-muted-foreground">
          Marcar como útil <ThumbsUp size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
