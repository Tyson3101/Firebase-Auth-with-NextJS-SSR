import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../libs/AuthContext";
import Link from "next/link";

function Test() {
  const router = useRouter();
  const { currentUser, loading, logout } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!currentUser) {
    return router.push("/login");
  }
  async function logoutFunc() {
    console.log("Log Out!");
    try {
      if (currentUser) await logout();
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div>
        <h1>USER AUTH</h1>
        <h2>Hey {currentUser?.email}</h2>
        <p>I found your UID! {currentUser?.uid}</p>
      </div>
      <button onClick={() => logoutFunc()}>
        {currentUser ? "Log Out" : "Sign In"}
      </button>
      <h5>
        <Link href={"/"}>Home Page</Link>
      </h5>
    </>
  );
}

export default Test;
