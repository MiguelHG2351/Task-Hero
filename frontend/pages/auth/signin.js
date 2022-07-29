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
    }, []);

    return (
        <>
            <Head>
                <title>Login/Register</title>
            </Head>
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-primary">Login in to TaskHero</h1>
                {Object.values(providers).map((provider) => {
                    return (
                        <div key={provider.name}>
                            <button className="bg-secondary w-full md:w-80 py-2 mb-4" onClick={() => signIn(provider.id)}>
                                <Icon provider={provider.name} />
                                <span className="text-secondary ml-2">
                                  Continue with {provider.name}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function Icon({ provider }) {
    if (provider === "Google") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="align-middle"
            >
                <path
                    d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM13.2617 13.625C12.4688 14.3555 11.3867 14.7852 10.0957 14.7852C8.22656 14.7852 6.60938 13.7129 5.82227 12.1504C5.49805 11.5039 5.3125 10.7734 5.3125 10C5.3125 9.22656 5.49805 8.49609 5.82227 7.84961C6.60938 6.28516 8.22656 5.21289 10.0957 5.21289C11.3848 5.21289 12.4668 5.6875 13.2969 6.45898L11.9258 7.83203C11.4297 7.35742 10.7988 7.11719 10.0977 7.11719C8.85156 7.11719 7.79687 7.95898 7.41992 9.08984C7.32422 9.37695 7.26953 9.68359 7.26953 10C7.26953 10.3164 7.32422 10.623 7.41992 10.9102C7.79687 12.041 8.85156 12.8828 10.0957 12.8828C10.7402 12.8828 11.2871 12.7129 11.7148 12.4258C12.2227 12.0859 12.5586 11.5801 12.6699 10.9805H10.0957V9.12891H14.6016C14.6582 9.44336 14.6875 9.76953 14.6875 10.1074C14.6875 11.5664 14.166 12.791 13.2617 13.625V13.625Z"
                    fill="white"
                />
            </svg>
        );
    }
    if (provider === "Facebook") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="align-middle"
            >
                <path
                    d="M18.3333 10C18.3333 5.40002 14.6 1.66669 9.99996 1.66669C5.39996 1.66669 1.66663 5.40002 1.66663 10C1.66663 14.0334 4.53329 17.3917 8.33329 18.1667V12.5H6.66663V10H8.33329V7.91669C8.33329 6.30835 9.64163 5.00002 11.25 5.00002H13.3333V7.50002H11.6666C11.2083 7.50002 10.8333 7.87502 10.8333 8.33335V10H13.3333V12.5H10.8333V18.2917C15.0416 17.875 18.3333 14.325 18.3333 10Z"
                    fill="white"
                />
            </svg>
        );
    }
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
