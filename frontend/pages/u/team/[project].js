import Head from "next/head";
import { LayoutGroup } from "framer-motion";
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { selectProject } from 'app/redux/counterSlice'
import { useEffect } from "react";

import { useAppSelector } from "app/hook";
import { selectUser } from 'app/redux/counterSlice';

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from "components/pages/Project/MenuProject";
import CardList from "components/pages/Project/CardList";
import { useRouter } from "next/router";

export default function Project() {
  const router = useRouter();
  console.log('router', router.query)
  const selector = useAppSelector(selectUser)

  useEffect(() => {
    if (Object.keys(selector).length > 0) {
        console.log(selector)   
    }
  }, [selector]);

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

Project.PageLayout = Layout;
