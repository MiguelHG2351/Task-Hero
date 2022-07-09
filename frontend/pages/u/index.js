import Head from 'next/head';

import { useEffect } from 'react';
import { selectCurrentTeam } from 'app/redux/counterSlice';
import { useAppSelector } from "app/hook";

import Layout from "components/containers/Layout/UserLayout";

export default function U() {
    const grettings = `Hola, bienvenido`;
    const selector = useAppSelector(selectCurrentTeam)
    console.log('selector', selector)

    
    return (
        <>
            <Head>
                <title>{grettings}</title>
            </Head>
            <section className="teams px-4 border-dark-primary border-0 border-t-primary md:border-l-primary md:border-l-0.5 md:border-t-0.5 border-solid h-full">
                <h3 className='text-white'>Overview</h3>
                <section className="team grid grid-cols-1 md:grid-cols-3">
                    {/* {(!loading && data) && (
                        data.getTeams.map((team, index) => <TeamList teamId={team.id} key={team.full_name+index} name={team.full_name} projects={team.projects} user={team.TeamAndUser} vault={team.vaulTeam} />)
                    )} */}
                </section>
            </section>
        </>
    )
}


U.PageLayout = Layout
