import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../../libs/AuthContext";

function signUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  async function submitForm(e: FormEvent) {
    e.preventDefault();
    console.log("running");
    try {
      await signup(email, password);
      router.push("/");
    } catch (e) {
      console.log(e, e.message);
      if (e.message.includes("auth/invalid-email")) setError("Invaild Email");
      else if (e.message.includes("auth/weak-password"))
        setError("Weak Password! Aim for 6 characters");
      else if (e.message.includes("auth/internal-error"))
        setError("Internal Server Error! Try again.");
      else if (e.message.includes("auth/email-already-in-use"))
        setError("Email already in use");
    }
  }
  return (
    <>
      <div>
        <h1>Sign Up</h1>
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
            Sign Up
          </button>{" "}
        </div>
        <button>
          <Link href={"/login"}>Log In</Link>
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
            "https://github.com/Tyson3101/Firebase-Auth-with-NextJS-SSR/blob/main/src/pages/signup/index.tsx"
          }
        >
          Github
        </a>
      </span>
    </>
  );
}

export default signUp;
