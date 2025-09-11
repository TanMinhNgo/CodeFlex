"use client";

import { SignIn, useUser } from "@clerk/nextjs";

const SignInPage = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    // Optionally, redirect or show a message
    return null;
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
};
export default SignInPage;