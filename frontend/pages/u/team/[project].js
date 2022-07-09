import Head from "next/head";
import { LayoutGroup } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

import { useAppSelector } from "app/hook";
import { selectCurrentTeam } from "app/redux/counterSlice";

import Layout from "components/containers/Layout/UserLayout";
import MenuProject from "components/pages/Project/MenuProject";
import CardList from "components/pages/Project/CardList";
import { GET_TABLES } from "app/apollo/projects";
import AddCard from "components/portals/AddCard";

export default function Project() {
    const router = useRouter();
    const selector = useAppSelector(selectCurrentTeam);
    const [getTables, { loading, error, data, refetch }] =
        useLazyQuery(GET_TABLES);
    const [project, setProject] = useState({});
    const [showCardModal, setShowCardModal] = useState({
        show: false,
        tableId: "",
    });
    const [categoryFilter, setCategoryFilter] = useState({
        Low: true,
        Medium: false,
        High: true,
    });

    useEffect(() => {
        if (Object.keys(selector).length > 0) {
            setProject(
                selector.projects.find(
                    (project) => project.id === router.query.project
                )
            );
        }
    }, [selector, router]);
    useEffect(() => {
        if (router.query?.project) {
            getTables({
                variables: {
                    getTablesId: router.query.project,
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
                    <MenuProject setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} name={project?.name ?? "xD"} />
                </LayoutGroup>
                <section className="card-list px-4 py-4 bg-secondary md:flex md:gap-x-3 md:whitespace-nowrap md:overflow-x-auto">
                    {(data?.getTables.length > 0) &&
                        data.getTables.map((table) => {
                            return <CardList
                                key={table.id}
                                filters={categoryFilter}
                                openModal={setShowCardModal}
                                table={table}
                            />;
                        })}
                </section>
            </section>
            <Suspense>
                <AddCard
                    refetch={refetch}
                    setShowModal={setShowCardModal}
                    showInfo={showCardModal}
                />
            </Suspense>
        </>
    );
}

Project.PageLayout = Layout;
