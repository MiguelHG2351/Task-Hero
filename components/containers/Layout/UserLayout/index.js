import Header from "../../Header";
import LayoutListTeam from "components/pages/Home/LayoutListTeam";

import { useAppDispatch, useAppSelector } from "app/hook";
import { selectUser, setTeams } from "app/redux/counterSlice";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "app/apollo/projects";
import { useRef } from "react";

export default function UserLayout({ children }) {
  const sidenavRef = useRef(null);
  const selector = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: {
      userId: selector.id,
      skip: 0,
      take: 2,
    },
    onCompleted: (data) => {
      console.log("data", data.getTeams);
      dispatch(setTeams(data.getTeams));
    },
  });
  console.log("funca", data);

  return (
    <>
      <Header sidenavRef={sidenavRef} />
      <main className="relative min-h-[calc(100vh_-_45px)] md:h-[calc(100%_-45px)] overflow-hidden grid grid-cols-[min-content_minmax(0,_1fr)] grid-rows-1">
        <section ref={sidenavRef} className="sidenav-project border-dark-primary border-0 border-t-primary border-t-0.5 border-solid absolute bg-black/[.6] h-[calc(100vh_-_45px)] left-0 top-0 w-screen md:static md:w-auto md:inline-block transition-transform -translate-x-[100vw] md:translate-x-0">
          <div className="container w-5/6">
            <div className="project-header bg-primary flex justify-between items-center py-4 px-2">
              <div className="project-header-title">
                <h1 className="inline-block align-middle m-0 mr-2 text-primary text-lg uppercase">
                  Projects
                </h1>
                <span className="inline-block text-secondary text-lg align-middle">(8)</span>
              </div>
              <div className="expandir-add inline-flex items-center">
                <button className="p-2 bg-transparent border-none hover:bg-green-500/[.5] text-[0px] rounded">
                  <svg
                    className="inline-block align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                      d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z"
                      className="fill-primary"></path>
                  </svg>
                </button>
                <button className="p-2 bg-transparent border-none hover:bg-cyan-500/[.5] text-[0px] rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="md:hidden"
                    fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.55752 2.05752C4.61558 1.99931 4.68455 1.95314 4.76048 1.92163C4.83641 1.89012 4.91781 1.8739 5.00002 1.8739C5.08223 1.8739 5.16363 1.89012 5.23956 1.92163C5.31549 1.95314 5.38446 1.99931 5.44252 2.05752L12.9425 9.55752C13.0007 9.61558 13.0469 9.68455 13.0784 9.76048C13.1099 9.83641 13.1261 9.91781 13.1261 10C13.1261 10.0822 13.1099 10.1636 13.0784 10.2396C13.0469 10.3155 13.0007 10.3845 12.9425 10.4425L5.44252 17.9425C5.32516 18.0599 5.16599 18.1258 5.00002 18.1258C4.83405 18.1258 4.67488 18.0599 4.55752 17.9425C4.44016 17.8252 4.37423 17.666 4.37423 17.5C4.37423 17.334 4.44016 17.1749 4.55752 17.0575L11.6163 10L4.55752 2.94252C4.49931 2.88446 4.45314 2.81549 4.42163 2.73956C4.39012 2.66363 4.3739 2.58223 4.3739 2.50002C4.3739 2.41781 4.39012 2.33641 4.42163 2.26048C4.45314 2.18455 4.49931 2.11558 4.55752 2.05752V2.05752Z"
                      className="fill-primary"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.55752 2.05752C9.61558 1.99931 9.68454 1.95314 9.76048 1.92163C9.83641 1.89012 9.91781 1.8739 10 1.8739C10.0822 1.8739 10.1636 1.89012 10.2396 1.92163C10.3155 1.95314 10.3845 1.99931 10.4425 2.05752L17.9425 9.55752C18.0007 9.61558 18.0469 9.68455 18.0784 9.76048C18.1099 9.83641 18.1261 9.91781 18.1261 10C18.1261 10.0822 18.1099 10.1636 18.0784 10.2396C18.0469 10.3155 18.0007 10.3845 17.9425 10.4425L10.4425 17.9425C10.3252 18.0599 10.166 18.1258 10 18.1258C9.83405 18.1258 9.67488 18.0599 9.55752 17.9425C9.44016 17.8252 9.37423 17.666 9.37423 17.5C9.37423 17.334 9.44016 17.1749 9.55752 17.0575L16.6163 10L9.55752 2.94252C9.49931 2.88446 9.45314 2.81549 9.42163 2.73956C9.39012 2.66363 9.3739 2.58223 9.3739 2.50002C9.3739 2.41781 9.39012 2.33641 9.42163 2.26048C9.45314 2.18455 9.49931 2.11558 9.55752 2.05752V2.05752Z"
                      className="fill-primary"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="team-list bg-secondary">
              {!loading &&
                !error &&
                data.getTeams.map((team, index) => {
                  return (
                    <LayoutListTeam
                      key={team.full_name + index}
                      name={team.full_name}
                      projects={team.projects}
                    />
                  );
                })}
            </div>
          </div>
        </section>
        {children}
      </main>
    </>
  );
}
