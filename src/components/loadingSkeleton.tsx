import { FC } from "react";
import { Skeleton } from "./ui/skeleton";
import { Dot, MapPin, Twitter, Users2 } from "lucide-react";

interface LoadingSkeletonProps {
  username: string;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ username }) => {
  return (
    <div className="p-2 mt-2 border-2 border-sky-500">
      <div className="flex flex-col items-center w-full md:flex-row md:space-x-2 ">
        <div className="h-full">
          <Skeleton className="w-32 h-32 rounded-full md:rounded-sm"></Skeleton>
        </div>
        <div className="flex flex-col items-center md:items-start md:space-y-1">
          <span className="text-2xl font-bold capitalize">{username}</span>
          <Skeleton className="inline-block w-56 h-3.5"></Skeleton>
          <Skeleton className="inline-block w-28 h-3.5 mt-2"></Skeleton>
          <div className="flex items-end">
            <Users2 className="inline-block i" />
            <span>
              <Skeleton className="inline-block w-6 h-4" />
              followers
            </span>
            <Dot />
            <span>
              <Skeleton className="inline-block w-6 h-4" /> following
            </span>
          </div>
          <div>
            <span>
              <MapPin className="inline-block" />{" "}
              <Skeleton className="inline-block w-16 h-3.5" />
            </span>
            <Dot className="inline-block" />

            <span>
              <Skeleton className="inline-block w-6 h-4" /> Public Repos
            </span>
          </div>

          <span className="font-bold text-sky-500">
            <Twitter className="inline-block" />@
            <Skeleton className="inline-block w-20 h-3.5 bg-sky-500/30" />
          </span>
        </div>
      </div>
      <div className="w-full">
        <h3 className="my-2 text-xl font-bold">Public Repos</h3>
        <ul className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="w-full bg-sky-500/5  min-h-[150px] p-1 border  rounded-md">
              <Skeleton className="  bg-sky-600/50 w-48 h-3.5 mt-2" />
              <Skeleton className="bg-zinc-200  w-28 h-3.5 mt-2" />

              <Skeleton className="bg-zinc-200 inline-block w-56 h-3.5" />

              <div className="space-x-1 space-y-1 ">
                {[
                  "bg-blue-500/30",
                  "bg-red-500/30",
                  "bg-yellow-500/30",
                  "bg-green-500/30",
                ].map((color, inx) => {
                  return (
                    <Skeleton
                      key={inx}
                      className={`${color} inline-block w-16 h-6`}
                    ></Skeleton>
                  );
                })}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
