import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import colors from "@/color.json";
import { ExternalLink } from "lucide-react";

interface RepoDetailsProps {
  repo: Repository;
}

const RepoDetails: FC<RepoDetailsProps> = ({ repo }) => {
  const { data: languageData } = useQuery({
    queryKey: [repo.name],
    queryFn: async () => {
      const { data } = await axios.get(repo.languages_url);
      return data as LanguageData[];
    },
  });

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex?.slice(1, 3), 16);
    const g = parseInt(hex?.slice(3, 5), 16);
    const b = parseInt(hex?.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return (
    <div className="w-full bg-sky-500/5 min-h-[150px] p-1 border border-sky-500/50 rounded-md">
      <a
        href={repo.html_url}
        className="table text-lg font-semibold text-sky-600 dark:text-sky-400"
        target="_blank"
      >
        {repo.name} <ExternalLink className="inline-block" size={15} />
      </a>
      {repo.homepage && (
        <a href={repo.homepage} target="_blank">
          {repo.homepage} <ExternalLink className="inline-block" size={10} />
        </a>
      )}

      <p>{repo.description ? repo.description : "No description"}</p>
      {languageData && (
        <div className="space-x-1 space-y-1">
          {Object.keys(languageData).map((language) => {
            const colorObject = colors[language as keyof typeof colors];
            const hexColor = colorObject
              ? (colorObject.color as string)
              : "#000000"; // Default color if key doesn't exist
            const backgroundColorWithOpacity = hexToRgba(hexColor, 0.5);
            return (
              <span
                style={{
                  backgroundColor: backgroundColorWithOpacity as string,
                }}
                className={` px-1 py-0.5 rounded-md inline-block`}
                key={language}
              >
                {language}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RepoDetails;
