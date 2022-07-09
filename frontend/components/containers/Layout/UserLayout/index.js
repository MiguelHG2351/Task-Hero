import Link from "next/link";
import dynamic from "next/dynamic";
// import { useAppSelector } from "app/hook";
// import {
//   selectUser
// } from "app/redux/counterSlice";

import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "app/apollo/projects";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../Header";
import LayoutListTeam from "components/pages/Home/LayoutListTeam";

const AddProject = dynamic(() => import('components/portals/AddProject'), {
  suspense: true,
})


export default function UserLayout({ children }) {
  const router = useRouter();
  const sidenavRef = useRef(null);
  const mainSideRef = useRef(null);
  const projectSideRef = useRef(null);
  // const selector = useAppSelector(selectUser);
  const [team, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: {
      userId: 'cl537msvk1652x07e9v169p9u',
      skip: 0,
      take: 2,
    },
    onCompleted: (data) => {
      const find = data.getTeams.find((team) => team.id === router.query.team);
      if (find === undefined) {
        router.push("/u");
      } else {
        setTeams(find.projects);
      }
    },
  });

  function viewProject() {
    mainSideRef.current.classList.add("translate-x-[-100vw]");
    projectSideRef.current.classList.remove("translate-x-[-100vw]");
  }

  function closeProjectSide() {
    mainSideRef.current.classList.remove("translate-x-[-100vw]");
    projectSideRef.current.classList.add("translate-x-[-100vw]");
  }

  return (
    <>
      <Header sidenavRef={sidenavRef} />
      <main className="relative min-h-[calc(100vh_-_45px)] md:h-[calc(100%_-45px)] overflow-hidden md:grid md:grid-cols-[min-content_minmax(0,_1fr)] md:grid-rows-1">
        <section
          ref={sidenavRef}
          className="sidenav-project box-border border-dark-primary border-0 border-t-primary border-t-0.5 border-solid absolute bg-black/[.6] h-[calc(100vh_-_45px)] left-0 top-0 w-screen md:flex md:static md:w-auto transition-transform -translate-x-[100vw] md:translate-x-0">
          <section
            ref={mainSideRef}
            className="containera bg-primary py-4 w-5/6 absolute md:static top-0 bottom-0 md:px-2 md:w-auto flex flex-col items-center md:translate-x-0">
            <div className="team flex items-center gap-x-2 bg-gray-600 p-4 w-5/6 md:w-auto rounded-sm box-border select-none">
              <img
                width={44}
                height={44}
                src="/images/examples/kotlin.png"
                className="flex-shrink-0"
                alt=""
              />
              <div className="team-info">
                <h3 className="m-0 text-primary">Kotlin Workspace</h3>
                <span className="text-secondary">Team</span>
              </div>
              <div className="change-team">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="44"
                  viewBox="0 0 28 44"
                  fill="none">
                  <path
                    d="M7.88 14.88L14 8.77333L20.12 14.88L22 13L14 5L6 13L7.88 14.88Z"
                    fill="white"
                  />
                  <path
                    d="M7.88 28.5652L14 35.0148L20.12 28.5652L22 30.5508L14 39L6 30.5508L7.88 28.5652Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="project w-5/6 text-left">
              <h4 className="text-secondary">Home</h4>
              <ul className="pl-0">
                <li className="list-none">
                  <Link href="/u">
                    <a className="text-dark-secondary bg-accent p-4 rounded-md flex items-center justify-between no-underline">Home</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="project w-5/6 text-left">
              <h4 className="text-secondary">Projects</h4>
              <ul className="pl-0">
                <li
                  onClick={viewProject}
                  className="list-none cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between">
                  <span className="text-dark-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="align-middle"
                      fill="none">
                      <path
                        d="M17.7363 6.89649L12.7773 6.17579L10.5605 1.68165C10.5 1.5586 10.4004 1.45899 10.2773 1.39844C9.96875 1.2461 9.59375 1.37305 9.43945 1.68165L7.22265 6.17579L2.26367 6.89649C2.12695 6.91602 2.00195 6.98048 1.90625 7.07813C1.79055 7.19705 1.72679 7.35704 1.72899 7.52294C1.73119 7.68884 1.79916 7.84708 1.91797 7.9629L5.50586 11.4609L4.6582 16.4004C4.63832 16.5153 4.65104 16.6335 4.6949 16.7415C4.73877 16.8496 4.81203 16.9432 4.90638 17.0117C5.00073 17.0802 5.1124 17.1209 5.22871 17.1292C5.34502 17.1375 5.46133 17.113 5.56445 17.0586L10 14.7266L14.4355 17.0586C14.5566 17.1231 14.6973 17.1445 14.832 17.1211C15.1719 17.0625 15.4004 16.7402 15.3418 16.4004L14.4941 11.4609L18.082 7.9629C18.1797 7.8672 18.2441 7.74219 18.2637 7.60548C18.3164 7.26368 18.0781 6.94727 17.7363 6.89649Z"
                        className="fill-dark-primary"
                      />
                    </svg>
                    Projects
                  </span>
                  <span className="text-dark-primary">2</span>
                </li>
              </ul>
            </div>
          </section>
          <section
            ref={projectSideRef}
            className="containera bg-[#313133] w-5/6 absolute md:static top-0 bottom-0 md:w-full transition-transform translate-x-[-100vw] md:translate-x-0">
            <div className="project-header bg-primary flex justify-between items-center py-4 px-2">
              <div className="project-header-title inline-flex">
                <h1 className="inline-block align-middle m-0 mr-2 text-primary text-sm uppercase">
                  Projects
                </h1>
                <span className="inline-block text-secondary text-sm align-middle">
                  (8)
                </span>
              </div>
              <div className="expandir-add inline-flex items-center">
                <button
                  onClick={closeProjectSide}
                  className="p-2 bg-transparent border-none hover:bg-cyan-500/[.5] text-[0px] rounded md:hidden">
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
            <div className="team-list flex flex-col gap-y-4 bg-secondary">
              {!loading &&
                !error &&
                team.map((team, index) => {
                  return (
                    <LayoutListTeam
                      key={team.name + index}
                      name={team.name}
                      projects={team.projects}
                    />
                  );
                })}
                <button
                  onClick={() => setShowModal(true)}
                  className="p-2 bg-transparent border-none hover:bg-green-500/[.5] text-[0px] rounded">
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
            </div>
          </section>
        </section>
        <Suspense>
          <AddProject setShowModal={setShowModal} show={showModal} />
        </Suspense>
        {children}
      </main>
    </>
  );
}
