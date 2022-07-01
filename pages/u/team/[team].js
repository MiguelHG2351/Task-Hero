import Head from 'next/head'
import { signIn, signOut } from 'next-auth/react'
import { LayoutGroup } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { selectProject } from 'app/redux/counterSlice'

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from 'components/containers/Home/MenuProject'
import CardList from 'components/containers/Home/CardList'
import authentication from 'app/server/authentication';

export default function Home({ user }) {
    const data = user

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <LayoutGroup>
                <MenuProject name={"xD"} />
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
