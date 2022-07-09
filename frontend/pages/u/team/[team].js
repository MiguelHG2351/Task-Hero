import Head from "next/head";
import { LayoutGroup } from "framer-motion";
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { selectProject } from 'app/redux/counterSlice'

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from "components/pages/Project/MenuProject";
import CardList from "components/pages/Project/CardList";
import { useAppDispatch } from "app/hook";
import { setCurrentTeam, setTeams } from "app/redux/counterSlice";
import { GET_PROJECTS } from "app/apollo/projects";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home({ user }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();
  const [getTeams, { loading, error, data }] = useLazyQuery(GET_PROJECTS, {
    onCompleted: (data) => {
      const find = data.getTeams.find((team) => team.id === router.query?.team);
      if (data.getTeams.length > 0 && find) {
        dispatch(setTeams(data.getTeams));
        dispatch(setCurrentTeam(find));
      } else {
        router.push("/u");
      }
    },
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      getTeams({
        variables: {
          userId: session.data.user.id,
          //   userId: 'cl537msvk1652x07e9v169p9u',
          skip: 0,
          take: 2,
        },
      });
    }
  }, [session]);

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
