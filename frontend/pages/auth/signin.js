import Head from "next/head";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { useEffect } from "react";

import AuthLayout from "components/containers/Layout/AuthLayout";

export default function Signin({ providers }) {

  useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <>
      <Head>
        <title>Login/Register</title>
      </Head>
      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}

Signin.PageLayout = AuthLayout;
