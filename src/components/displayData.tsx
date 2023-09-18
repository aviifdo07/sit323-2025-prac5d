import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dot, MapPin, Twitter, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RepoDetails from "./repoDetails";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DisplayDataProps {
  userData: GitUser;
}

const DisplayData: FC<DisplayDataProps> = ({ userData }) => {
  const [showAllRepo, setShowAllRepo] = useState(false);
  function getInitials(name: string): string {
    const words = name?.split(" ") || ["name"];
    let initials = "";

    for (const word of words) {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }

      if (initials.length >= 2) {
        break;
      }
    }

    return initials;
  }
  function formatNumber(number: number): string {
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }

  const { data: reposData } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(userData.repos_url);
      return (data as Repository[]) ?? [];
    },
  });

  return (
    <div className="flex flex-col items-center w-full p-2 mt-2 space-y-2 border-2 border-sky-500">
      <div className="flex flex-col items-center w-full md:flex-row md:space-x-2 ">
        <div className="h-full">
          <Avatar className="w-32 h-32 md:h-full md:rounded-sm md:aspect-auto">
            <AvatarImage
              src={userData?.avatar_url}
              alt={userData?.name}
              className=" md:aspect-auto"
            />
            <AvatarFallback>{getInitials(userData?.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center md:items-start md:space-y-1">
          <a
            href={userData.html_url}
            className="text-2xl font-bold capitalize hover:underline"
            target="_blank"
          >
            {userData?.name}
          </a>
          <div>{userData.bio}</div>
          <div className="flex items-end">
            <Users2 className="inline-block i" />
            <span>
              {formatNumber(userData.followers)}{" "}
              {userData.followers > 1 ? "followers" : "follower"}
            </span>
            <Dot />
            <span>{formatNumber(userData.following)} following</span>
          </div>
          <div>
            {userData.location && (
              <>
                <span>
                  <MapPin className="inline-block" /> {userData.location}
                </span>
                <Dot className="inline-block" />
              </>
            )}

            <span>{userData.public_repos} Public Repos</span>
          </div>
          {userData.twitter_username && (
            <a
              href={`https://www.twitter.com/${userData.twitter_username}`}
              target="_blank"
              className="font-semibold text-sky-500"
            >
              <Twitter className="inline-block" />@{userData.twitter_username}
            </a>
          )}
        </div>
      </div>

      <div className="w-full">
        <h3 className="my-2 text-xl font-bold">
          {(reposData?.length ?? 0) === 0 && "No "}Public Repos
        </h3>
        <ul className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 grid-rows-[masonry]">
          {Array.isArray(reposData) &&
            reposData
              .map((repo, index) => {
                return (
                  <li key={repo.id}>
                    <RepoDetails repo={repo} />
                  </li>
                );
              })
              .slice(0, 10)}

          {showAllRepo &&
            Array.isArray(reposData) &&
            reposData
              .map((repo, index) => {
                return (
                  <li key={repo.id}>
                    <RepoDetails repo={repo} />
                  </li>
                );
              })
              .slice(10)}

          {(reposData?.length ?? 0) > 10 && (
            <div
              onClick={() => setShowAllRepo(!showAllRepo)}
              className={cn(
                `w-full bg-sky-500/5 min-h-[150px] p-1 border border-sky-500/50 rounded-md  grid place-items-center cursor-pointer`,
                (reposData?.length ?? 0) % 2 === 0 && "md:col-span-2"
              )}
            >
              <span className="text-lg capitalize text-sky-500">
                {showAllRepo ? "Show Less" : "show all repos"}
              </span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DisplayData;
