interface Props {
  params: any;
}

export default function Home({ params }: Props) {
  const chatId = params?.["chat"]?.[0];
  return (
    <div className="bg-muted h-screen flex items-center justify-center w-screen">
      <h2 className="text-3xl font-medium">Welcome to OnIt</h2>
    </div>
  );
}
