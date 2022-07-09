import Head from 'next/head';

import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from 'app/hook';
import { setTeams } from 'app/redux/counterSlice';
import { GET_PROJECTS } from 'app/apollo/projects';

import Layout from "components/containers/Layout/UserLayout";
import TeamList from 'components/pages/Home/TeamList';

export default function U() {
    const grettings = `Hello Enrique!`;
    const session = useSession();
    const dispatch = useAppDispatch();

    const [getTeams, { loading, error, data }] = useLazyQuery(GET_PROJECTS, {
        onCompleted: (data) => {
          dispatch(setTeams(data.getTeams));
        },
    });

    useEffect(() => {
        if(session.status === 'authenticated') {
            getTeams({
                variables: {
                      userId: session.data.user.id,
                    //   userId: 'cl537msvk1652x07e9v169p9u',
                      skip: 0,
                      take: 2,
                    }
            });
        }
    }, [session])
    console.log('loading?', loading);
    console.log('session, data', session, data);
    
    return (
        <>
            <Head>
                <title>{grettings}</title>
            </Head>
            <section className="teams px-4 border-dark-primary border-0 border-t-primary md:border-l-primary md:border-l-0.5 md:border-t-0.5 border-solid h-full">
                <h3 className='text-white'>Overview</h3>
                <section className="team grid grid-cols-1 md:grid-cols-3">
                    {(!loading && data) && (
                        data.getTeams.map((team, index) => <TeamList teamId={team.id} key={team.full_name+index} name={team.full_name} projects={team.projects} user={team.TeamAndUser} vault={team.vaulTeam} />)
                    )}
                </section>
            </section>
        </>
    )
}


U.PageLayout = Layout
