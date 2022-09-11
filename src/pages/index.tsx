import React from "react";
import Link from "next/link";
import { useAuth } from "../libs/AuthContext";

function Home() {
  const { currentUser } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/signup"}>Signup</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/dashboardSSR"}>Dashboard (SSR)</Link>
        </li>
      </ul>
      {currentUser ? (
        <h4>You are signed in with the email: {currentUser.email}</h4>
      ) : (
        ""
      )}
      <span style={{ display: "block" }}>
        Code:{" "}
        <a
          target={"_blank"}
          href={
            "https://github.com/Tyson3101/Firebase-Auth-with-NextJS-SSR/blob/main/src/pages/index.tsx"
          }
        >
          Github
        </a>
      </span>
    </>
  );
}

export default Home;
