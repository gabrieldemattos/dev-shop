-- CreateTable
CREATE TABLE "UserFavoriteProduct" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteProduct_pkey" PRIMARY KEY ("userId","productId")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteProduct" ADD CONSTRAINT "UserFavoriteProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProduct" ADD CONSTRAINT "UserFavoriteProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
