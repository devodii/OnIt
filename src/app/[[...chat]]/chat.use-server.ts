"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

export const getChatHistory = async (chatId: string) => {
  const messages = await openai.beta.threads.messages.list(chatId);
  return messages.data.reverse().map(({ id, content, role }) => ({
    id,
    message: content[0]?.type === "text" ? content[0]?.text.value : "",
    role,
  }));
};

export const chat = async (chatId: string | null, message: string) => {
  const isValidChat = await isValidChatId(chatId);
  if (!isValidChat) return initChat();

  if (chatId) {
    await sendMessage(chatId, message);
  }

  const run = await openai.beta.threads.runs.createAndPoll(chatId!, {
    assistant_id: process.env.ASSISTANT_ID!,
  });

  console.log({ run });
  if (run.status == "completed") {
    const messages = await getChatHistory(chatId!);
    return messages[-1];
  }
};

const initChat = async () => {
  const chat = await openai.beta.threads.create();
  redirect(`/${chat.id}`);
};

const sendMessage = async (
  chatId: string,
  content: string
): Promise<{ id: string | null }> => {
  if (!content) return { id: null };

  const message = await openai.beta.threads.messages.create(chatId, {
    role: "user",
    content: [{ type: "text", text: content }],
  });

  return { id: message.id };
};

const isValidChatId = async (chatId: string | null) => {
  if (chatId == null) return false;
  return await openai.beta.threads
    .retrieve(chatId)
    .then(() => true)
    .catch(() => false);
};
