"use client";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import DisplayData from "@/components/displayData";
import { Button } from "@/components/ui/button";
import { Frown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [fetcherror, setFetchError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username") as string);
    } else {
      setUsername("vercel");
    }
    setTimeout(() => {
      fetchData();
      inputRef?.current?.focus();
    }, 100);
  }, []);

  const {
    data: userData,
    isLoading,
    mutate: fetchData,
    isError,
  } = useMutation({
    mutationKey: ["repoData"],
    mutationFn: async () => {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      localStorage.setItem("username", username);

      return data as GitUser;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return setFetchError("User Not found");
        }
        setFetchError(err.message);
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.startsWith("@")) {
      setUsername(username.substring(1));
    }
    fetchData();
  };

  return (
    <main className="container mx-auto mt-2 mb-20">
      <form
        onSubmit={handleSubmit}
        className="gap-2 p-2 space-y-2 border-2 border-green-500 md:flex md:items-end"
      >
        <div className=" md:grow">
          <label htmlFor="username" className="text-sm font-bold">
            User Name:
          </label>
          <Input
            id="username"
            ref={inputRef}
            placeholder="userName"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
            onFocus={() => inputRef.current?.select()}
          />
        </div>
        <Button
          disabled={isLoading || username.length < 3}
          type="submit"
          className="w-full font-bold transition md:w-24"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Get Data"
          )}
        </Button>
      </form>
      {isLoading && <LoadingSkeleton username={username} />}
      {userData && <DisplayData userData={userData} />}
      {isError && (
        <>
          <p className="font-bold text-center text-red-600">
            Someting went wrong: {fetcherror}
          </p>
          <Frown className="w-24 h-24 mx-auto text-red-600/10 " />
        </>
      )}
    </main>
  );
}
