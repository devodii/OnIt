import { ChatHistory } from "./chat.interface";
import * as This_Internal from "./chat.internal";

interface Props {
  chatId: string;
  messages: ChatHistory;
}

export const Chat = ({ chatId, messages }: Props) => {
  return (
    <div>
      <This_Internal.ChatPanel chatId={chatId} />
      <This_Internal.ChatMessages messages={messages} />
    </div>
  );
};
