import { Star } from "lucide-react";
import React from "react";

const ProductStatus = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <Star className="fill-primary text-primary" size={20} />
          <Star className="fill-primary text-primary" size={20} />
          <Star className="fill-primary text-primary" size={20} />
          <Star className="fill-primary text-primary" size={20} />
          <Star className="fill-primary text-primary" size={20} />
        </div>

        <span className="font-semibold text-gray-400">126 avaliações</span>
      </div>

      <span className="font-semibold text-green-600">Em estoque</span>
    </div>
  );
};

export default ProductStatus;
