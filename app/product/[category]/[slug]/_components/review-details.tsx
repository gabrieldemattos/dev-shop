import DisplayUserReviewRating from "@/app/_components/display-user-review-rating";
import { Separator } from "@/app/_components/ui/separator";
import { formatDate, formatHour } from "@/app/_helpers/format-date";

interface ReviewDetailsProps {
  separator?: boolean;
  userName: string;
  userRating: number;
  userComment?: string;
  createdAt: Date;
}

const ReviewDetails = ({
  separator = false,
  userName,
  userRating,
  userComment,
  createdAt,
}: ReviewDetailsProps) => {
  return (
    <div className="space-y-2">
      <p className="text-base font-bold">{userName}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <DisplayUserReviewRating
            totalStars={5}
            iconSize={15}
            userRating={userRating}
          />
        </div>

        <span className="text-xs font-semibold text-gray-400">
          {formatDate(createdAt)} às {formatHour(createdAt)}h
        </span>
      </div>

      <div>
        {userComment ? (
          <span className="text-sm text-muted-foreground">{userComment}</span>
        ) : (
          <span className="text-sm italic text-muted-foreground">
            Usuário não deixou nenhum comentário sobre o produto
          </span>
        )}
      </div>

      {separator && <Separator />}
    </div>
  );
};

export default ReviewDetails;
