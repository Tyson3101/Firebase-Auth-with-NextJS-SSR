import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../../libs/AuthContext";

function logIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function submitForm(e: FormEvent) {
    e.preventDefault();
    console.log("running");
    try {
      await login(email, password);
      router.push("/");
    } catch (e) {
      console.log(e);
      if (e.message.includes("auth/invalid-email")) setError("Invaild Email");
      else if (e.message.includes("auth/wrong-password"))
        setError("Invaild Password");
      else if (e.message.includes("auth/user-not-found"))
        setError("No user found!");
    }
  }

  return (
    <>
      <div>
        <h1>Log In</h1>
        <h3>{error}</h3>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="user@email.com"
          />{" "}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="*********"
          />
          <br />
          <button type="submit" onClick={submitForm}>
            Log In!
          </button>
        </div>
        <button>
          <Link href={"/signup"}>Signup</Link>
        </button>
        <button>
          <Link href={"/"}>Homepage</Link>
        </button>
      </div>
      <span style={{ display: "block" }}>
        Code:{" "}
        <a
          target={"_blank"}
          href={
            "https://github.com/Tyson3101/Firebase-Auth-with-NextJS-SSR/blob/main/src/pages/login/index.tsx"
          }
        >
          Github
        </a>
      </span>
    </>
  );
}

export default logIn;
