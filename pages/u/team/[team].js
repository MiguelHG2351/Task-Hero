import Head from 'next/head'
import { signIn, signOut } from 'next-auth/react'
import { LayoutGroup } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { selectProject } from 'app/redux/counterSlice'

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from 'components/pages/Project/MenuProject'
import CardList from 'components/pages/Project/CardList'
import authentication from 'app/server/authentication';
import { useAppDispatch } from 'app/hook';
import { setUser } from 'app/redux/counterSlice';

export default function Home({ user }) {
    const dispatch = useAppDispatch();
    dispatch(setUser(user));

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <section className="container-table">
                <LayoutGroup>
                    <MenuProject name={"xD"} />
                </LayoutGroup>
                <CardList />
                <div className="login">
                    <button onClick={() => signIn()}>Login</button>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            </section>
        </>
    )
}

Home.PageLayout = Layout


export async function getServerSideProps(context) {
    const user = await authentication(context)
    console.log(context.query)

    if(!user) {
        return {
            redirect: { destination: '/auth/signin' }
        }
    }

    return {
        props: {
            user
        }
    }
}
