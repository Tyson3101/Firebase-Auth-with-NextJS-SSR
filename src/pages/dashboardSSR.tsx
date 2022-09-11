import { GetServerSidePropsContext } from "next";
import { useAuth } from "../libs/AuthContext";
import { auth } from "../libs/firebaseAdmin";
import nookies from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard(message) {
  const router = useRouter();
  const { currentUser, logout, loading } = useAuth();

  console.log(message);
  if (loading) return <div>Loading...</div>;
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await auth.verifyIdToken(cookies.token);

    const { uid, email } = token;
    // Can fetch stuff
    return {
      props: {},
    };
  } catch (err) {
    return { redirect: { destination: "/login" } };
    /*
    return {
      props: { message: `PLEASE LOGIN....` },
    };
    */
  }
}
