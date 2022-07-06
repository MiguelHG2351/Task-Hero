import Head from "next/head";
import { signIn, signOut } from "next-auth/react";
import { LayoutGroup } from "framer-motion";
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { selectProject } from 'app/redux/counterSlice'

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from "components/pages/Project/MenuProject";
import CardList from "components/pages/Project/CardList";
import authentication from "app/server/authentication";
import { useAppDispatch } from "app/hook";
import { setUser, setCurrentTeam, setTeams } from "app/redux/counterSlice";
import { GET_PROJECTS } from "app/apollo/projects";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home({ user }) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: {
      userId: user.id,
      skip: 0,
      take: 2,
    },
    onCompleted: (data) => {
      const find = data.getTeams.find((team) => team.id === router.query?.team)
      console.log(data)
      if(data.getTeams.length > 0 && find) {
        console.log("data", data);
        dispatch(setTeams(data.getTeams));
        dispatch(setCurrentTeam(find));
      } else {
        router.push("/u" )
      }
    },
  });
  dispatch(setUser(user));

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <section className="container-table max-h-[calc(100vh_-_45px)] box-border overflow-y-auto">
        <LayoutGroup>
          <MenuProject name={"xD"} />
        </LayoutGroup>
        <CardList />
      </section>
    </>
  );
}

Home.PageLayout = Layout;

export async function getServerSideProps(context) {
  const user = await authentication(context);
  console.log(context.query);

  if (!user) {
    return {
      redirect: { destination: "/auth/signin" },
    };
  }

  return {
    props: {
      user,
    },
  };
}
