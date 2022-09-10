import { GetServerSidePropsContext } from "next";
import { useAuth } from "../contexts/AuthContext";
import firebaseAdmin from "../libs/firebaseAdmin";
import nookies from "nookies";
import { useRouter } from "next/router";

export default function Home(message) {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  console.log(message);
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
      <h1>USER AUTH</h1>
      <h3>
        {" "}
        <strong>Email:</strong> {currentUser?.email}
      </h3>
      <h4>{message.message}</h4>
      <button onClick={() => logoutFunc()}>
        {currentUser ? "Log Out" : "Sign In"}
      </button>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;
    // FETCH STUFF HERE!! 🚀

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    //ctx.res.writeHead(302, { Location: "/login" });
    //ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: { message: "LOG IN MY GUY!!!!!!!!!!!!!!!!!!!!!" } };
  }
}
