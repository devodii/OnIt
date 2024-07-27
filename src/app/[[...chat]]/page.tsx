import { Chat } from "./chat.use-client";
import { getChatHistory } from "./chat.use-server";

interface Props {
  params: any;
}

export default async function Home({ params }: Props) {
  const chatId = (params?.["chat"]?.[0] as string) ?? null;
  const messages = (await getChatHistory(chatId!)) ?? [];

  return (
    <div className="bg-muted h-screen flex flex-col gap-12 items-center justify-center w-screen">
      <h2 className="text-3xl font-medium">Chat with OnIt AI</h2>

      <Chat chatId={chatId} messages={messages} />
    </div>
  );
}
