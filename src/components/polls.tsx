"use client";

import { useFetchPolls } from "@/hooks/use-fetch-polls";
import { CreateNewPollDialog } from "./create-new-poll-dialog";
import { PollsSkeletetonTable } from "./polls-skeleton-table";
import { PollsTable } from "./polls-table";
import { Frown } from "lucide-react";
import { AskForSuggestionsForNewPollsForAIDialog } from "./ask-for-suggestions-for-new-polls-for-ai-dialog";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Polls() {
  const router = useRouter();
  const { polls, loading } = useFetchPolls();
  const { status } = useGetProfile();

  useEffect(() => {
    if (status === "error") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 mt-12 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-2xl  font-bold">Todas as suas enquetes</h1>
        <div className="w-full md:w-fit flex flex-col md:flex-row gap-2 items-center">
          <CreateNewPollDialog />
          <AskForSuggestionsForNewPollsForAIDialog />
        </div>
      </div>
      {loading ? <PollsSkeletetonTable /> : null}
      {!loading && polls.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 pt-12">
          <Frown className="size-24 text-zinc-300" />
          <span>Nenhuma enquete registrada!</span>
        </div>
      ) : null}
      {!loading && polls.length > 0 ? <PollsTable polls={polls} /> : null}
    </section>
  );
}
