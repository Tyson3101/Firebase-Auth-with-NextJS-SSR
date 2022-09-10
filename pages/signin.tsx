import React from "react";

function signin() {
  return (
    <>
      <div>
        <h1>Log In</h1>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@email.com"
          />{" "}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
          />
          <br />
          <button type="submit" onClick={() => null}>
            Log in
          </button>
        </div>
        <button>
          <a href="/">Home page!</a>
        </button>
      </div>
    </>
  );
}

export default signin;
