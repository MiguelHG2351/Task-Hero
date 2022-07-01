import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react'
import { LayoutGroup } from 'framer-motion'
import { useSelector } from 'react-redux'


import Layout from "components/containers/Layout/UserLayout";
import MenuProject from 'components/containers/Home/MenuProject'
import CardList from 'components/containers/Home/CardList'
import authentication from 'app/server/authentication';

export default function Home({ user }) {
    const data = user
    const getData = useSelector((state) => state.project.projects)
    console.log(getData)

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <LayoutGroup>
                <MenuProject name={getData[0].projectName} />
            </LayoutGroup>
            <CardList />
            <div className="login">
                <button onClick={() => signIn()}>Login</button>
                <button onClick={() => signOut()}>Logout</button>
                <p>{data.data?.user.name}</p>
            </div>
        </>
    )
}

Home.PageLayout = Layout


export async function getServerSideProps(context) {
    const user = await authentication(context)

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
