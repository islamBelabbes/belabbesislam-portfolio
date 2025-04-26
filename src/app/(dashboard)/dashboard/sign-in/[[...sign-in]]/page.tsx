import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen justify-center items-center">
      <SignIn />
    </main>
  );
}
