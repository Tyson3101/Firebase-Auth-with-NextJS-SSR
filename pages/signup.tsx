import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function signUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup } = useAuth();

  async function submitForm(e: FormEvent) {
    e.preventDefault();
    console.log("running");
    try {
      await signup(email, password);
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div>
        <h1>Sign Up</h1>
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
          <a href="/login">Log In</a>
        </button>
        <button>
          <a href="/">Home page!</a>
        </button>
      </div>
    </>
  );
}

export default signUp;
