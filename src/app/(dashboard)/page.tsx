"use client";
import { Button } from "@/components/ui/button";
import WelcomeMessage from "@/components/WelcomeMessage";
import useNewAccount from "@/hooks/useNewAccount";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <WelcomeMessage></WelcomeMessage>
      <Button onClick={onOpen}>Add Account</Button>
    </section>
  );
}
