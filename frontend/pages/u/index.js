import Head from 'next/head';

import { useAppDispatch } from 'frontend/app/hook';
import { setTeams, setUser } from 'frontend/app/redux/counterSlice';

import Layout from "components/containers/Layout/HomeLayout/index";
import authentication from 'frontend/app/server/authentication';
import TeamList from 'components/pages/Home/TeamList';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from 'frontend/app/apollo/projects';

export default function U({ user }) {
    const dispatch = useAppDispatch();
    dispatch(setUser(user));

    console.log(user.id)
    const { loading, error, data } = useQuery(GET_PROJECTS, {
        variables: {
          userId: user.id,
          skip: 0,
          take: 2,
        },
        onCompleted: (data) => {
          console.log("data", data.getTeams);
          dispatch(setTeams(data.getTeams));
          console.log(data.getTeams[0].vaulTeam.length)
        },
    });
    
    return (
        <>
            <Head>
                <title>Hola {user.name}!</title>
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

export async function getServerSideProps(context) {
    const user = await authentication(context)
    console.log(context.query)
    console.log(context.req.cookies.graphql)

    if(!user) {
        return {
            redirect: { destination: '/auth/signin' }
        }
    }

    return {
        props: {
            user,
        }
    }
}


U.PageLayout = Layout
