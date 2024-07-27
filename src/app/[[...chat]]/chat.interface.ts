import type { Message } from "openai/resources/beta/threads/messages.mjs";

export type ChatHistory = Array<
  Pick<Message, "id" | "role"> & { message: string }
>;
