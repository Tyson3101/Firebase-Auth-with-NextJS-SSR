import { AuthProvider } from "../libs/AuthContext";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
