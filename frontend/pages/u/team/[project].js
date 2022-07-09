import Head from "next/head";
import { LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

import { useAppSelector } from "app/hook";
import { selectCurrentTeam } from "app/redux/counterSlice";

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from "components/pages/Project/MenuProject";
import CardList from "components/pages/Project/CardList";
import { GET_TABLES } from "app/apollo/projects";

export default function Project() {
    const router = useRouter();
    const selector = useAppSelector(selectCurrentTeam);
    const [getTables, { loading, error, data, refetch }] =
        useLazyQuery(GET_TABLES);
    const [project, setProject] = useState({});

    useEffect(() => {
        if (Object.keys(selector).length > 0) {
            setProject(selector.projects.find(project => project.id === router.query.project));
        }
    }, [selector, router]);
    useEffect(() => {
        if (router.query?.project) {
            getTables({
                variables: {
                  getTablesId: router.query.project
                },
            });
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <section className="container-table max-h-[calc(100vh_-_45px)] box-border overflow-y-auto">
                <LayoutGroup>
                    <MenuProject name={project?.name ?? "xD"} />
                </LayoutGroup>
                  <CardList cardItems={data?.getTables ?? []} />
            </section>
        </>
    );
}

Project.PageLayout = Layout;
