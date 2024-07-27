"use client";

import * as Jotai from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatHistory } from "./chat.interface";
import { chat } from "./chat.use-server";

export const isTypingAtom = Jotai.atom(false);
export const messagesAtom = Jotai.atom([] as ChatHistory);
export const updateMessages = Jotai.atom(
  null,
  (
    _,
    set,
    update: { message: string; id: string; role: "user" | "assistant" }
  ) => {
    set(messagesAtom, (prev) => [...prev, update]);
  }
);

export const ChatPanel = ({ chatId }: { chatId: string | null }) => {
  const [isTyping, setIsTyping] = Jotai.useAtom(isTypingAtom);
  const update = Jotai.useSetAtom(updateMessages);

  return (
    <div className="fixed bottom-0 right-0 left-0 flex items-center justify-center pb-12">
      <div className="bg-background rounded-md border w-full max-w-4xl px-4 py-2">
        <form
          className="flex items-center gap-2 border p-4 rounded-md"
          action={async (formdata) => {
            setIsTyping(true);
            const question = formdata.get("question") as string;
            update({ role: "user", message: question, id: "1212" });
            const m = await chat(chatId, question);
            update({ role: "assistant", message: m?.message!, id: m?.id! });
          }}
        >
          <Input
            className="border-none outline-none shadow-none focus-visible:ring-0 placeholder:text-[16px] flex-1"
            placeholder="Tell me about your project"
            name="question"
          />

          <Button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-5"
            >
              <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
};

export const ChatMessages = async ({ messages }: { messages: ChatHistory }) => {
  const recentMessages = Jotai.useAtomValue(messagesAtom);
  return (
    <div className="size-full max-w-7xl mx-auto max-h-[80vh] overflow-y-auto mb-[400px]">
      <ul className="divide-y">
        {messages?.length > 0 &&
          messages.map((_) => (
            <li key={_.id} className="flex flex-col gap-1">
              <span>{_.role}</span>
              <span>{_.message}</span>
            </li>
          ))}
      </ul>

      <ul className="divide-y">
        {recentMessages.map((_) => (
          <li key={_.id} className="flex flex-col gap-1">
            <span>{_.role}</span>
            <span>{_.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const EmptyScreen = () => <div>You have no messages yet.</div>;
