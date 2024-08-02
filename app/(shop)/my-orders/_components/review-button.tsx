import { Prisma } from "@prisma/client";
import CreateReview from "./create-review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { getOrderReview } from "@/app/(shop)/_actions/get-order-review";
import DisplayReview from "./display-review";

interface ReviewButtonProps {
  orderProductId: string;
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>;
}

const ReviewButton = async ({ orderProductId, product }: ReviewButtonProps) => {
  const session = await getServerSession(authOptions);

  const review = await getOrderReview(
    session?.user.id as string,
    orderProductId,
    product.id as string,
  );

  return (
    <>
      {review ? (
        <DisplayReview review={review} product={product} />
      ) : (
        <CreateReview orderProductId={orderProductId} product={product} />
      )}
    </>
  );
};

export default ReviewButton;
