import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session.data);
  return (
    <>
      <h1>USER AUTH</h1>
      <button>
        <a href="/signin">Sign In!</a>
      </button>
    </>
  );
}
