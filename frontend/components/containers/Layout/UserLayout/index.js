import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/future/image";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROJECTS } from "app/apollo/projects";
import { Suspense, useEffect, useRef, useState } from "react";
import { useAppSelector } from "app/hook";
import {
    setTeams as reduxSetTeams,
    setCurrentTeam,
    setUser,
    selectCurrentTeam,
} from "app/redux/counterSlice";
import { useAppDispatch } from "app/hook";

import Header from "../../Header";
import LayoutListTeam from "components/pages/Home/LayoutListTeam";
import AddTeam from "components/portals/AddTeam";
import classNames from "classnames";

const AddProject = dynamic(() => import("components/portals/AddProject"), {
    suspense: true,
});

const breadcrumbs = {
    "/u": { title: "Medios de Contacto", name: "Contáctanos" },
    "/u/team": { title: "Novedades", name: "Actualizaciones" },
};

export default function UserLayout({ children }) {
    const session = useSession();
    const sidenavRef = useRef(null);
    const mainSideRef = useRef(null);
    const dispatch = useAppDispatch();
    const projectSideRef = useRef(null);
    const currentTeam = useAppSelector(selectCurrentTeam);
    const [team, setTeams] = useState([]);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [changeTeam, setChangeTeam] = useState(false);
    const changeTeamClass = classNames(
        "teamSidenavList absolute left-0 top-full right-0 bg-secondary",
        {
            hidden: !changeTeam,
        }
    );

    const [getTeams, { loading, error, data, refetch }] =
        useLazyQuery(GET_PROJECTS);
    useEffect(() => {
        if (session.status === "authenticated") {
            getTeams({
                variables: {
                    userId: session.data.user.id,
                    skip: 0,
                    take: 2,
                },
            });
            dispatch(setUser(session.data.user));
        }
    }, [session]);

    useEffect(() => {
        if (data) {
            const getTeamOfLocalStorage = localStorage.getItem("currentTeam");
            setTeams(data.getTeams);
            dispatch(reduxSetTeams(data.getTeams));
            if (data.getTeams.length > 0 && !getTeamOfLocalStorage) {
                dispatch(setCurrentTeam(data.getTeams[0]));
            }
            if (typeof getTeamOfLocalStorage === "string") {
                try {
                    const parseLocalStorage = JSON.parse(getTeamOfLocalStorage);
                    const findProject = data.getTeams.find(
                        (team) => team.id === parseLocalStorage.id
                    );
                    dispatch(setCurrentTeam(findProject));
                } catch (error) {
                }
            }
        }
    }, [data]);

    function viewProject() {
        mainSideRef.current.classList.add("translate-x-[-100vw]");
        projectSideRef.current.classList.remove("translate-x-[-100vw]");
    }

    function closeProjectSide() {
        mainSideRef.current.classList.remove("translate-x-[-100vw]");
        projectSideRef.current.classList.add("translate-x-[-100vw]");
    }

    function changeTeamHandler(team, dom) {
        dispatch(setCurrentTeam(team));
        setChangeTeam(false);
    }

    return (
        <>
            <Header sidenavRef={sidenavRef} />
            <main className="relative min-h-[calc(100vh_-_45px)] md:h-[calc(100%_-45px)] overflow-hidden md:grid md:grid-cols-[min-content_minmax(0,_1fr)] md:grid-rows-1">
                <section
                    ref={sidenavRef}
                    className="sidenav-project box-border border-dark-primary border-0 border-t-primary border-t-0.5 border-solid absolute bg-black/[.6] h-[calc(100vh_-_45px)] left-0 top-0 w-screen md:flex md:static md:w-auto transition-transform -translate-x-[100vw] md:translate-x-0"
                >
                    <section
                        ref={mainSideRef}
                        className="containera bg-primary py-4 w-5/6 absolute md:static top-0 bottom-0 md:px-2 md:w-auto flex flex-col items-center md:translate-x-0 border-dark-primary border-0 border-r-dark-gray md:border-r-0.5 border-solid"
                    >
                        {!loading && currentTeam?.id && (
                            <div className="team relative flex items-center gap-x-2 bg-gray-600 py-4 px-5 w-5/6 md:w-auto rounded-sm box-border select-none">
                                <img
                                    width={44}
                                    height={44}
                                    src={currentTeam.image}
                                    className="flex-shrink-0"
                                    alt=""
                                />
                                <div className="team-info">
                                    <h3
                                        title="Kotlin Workspace"
                                        className="m-0 text-primary whitespace-nowrap w-[14ch] overflow-hidden text-ellipsis"
                                    >
                                        {currentTeam.full_name}
                                    </h3>
                                    <span className="text-secondary">Team</span>
                                </div>
                                <div
                                    className="change-team cursor-pointer hover:bg-secondary"
                                    onClick={() => setChangeTeam(!changeTeam)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="44"
                                        viewBox="0 0 28 44"
                                        fill="none"
                                    >
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
                                <div className={changeTeamClass}>
                                    <div className="title">
                                        <h5 className="text-secondary text-lg text-center m-0 p-2">
                                            Team List
                                        </h5>
                                    </div>
                                    <div className="sidenavListTeam px-2">
                                        <h5 className="text-secondary my-2">
                                            Team
                                        </h5>
                                        <ul className="px-1">
                                            {team.length > 0 &&
                                                team.map((_team) => (
                                                    <li
                                                        key={
                                                            _team.full_name +
                                                            _team.id
                                                        }
                                                        onClick={(e) =>
                                                            changeTeamHandler(
                                                                _team
                                                            )
                                                        }
                                                        className="p-2 hover:bg-primary text-secondary list-none"
                                                    >
                                                        <Image
                                                            className="align-middle mr-1"
                                                            src={_team.image}
                                                            alt={
                                                                _team.full_name
                                                            }
                                                            width="18"
                                                            height="18"
                                                        />
                                                        <span>
                                                            {_team.full_name}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                        <button
                                            onClick={() =>
                                                setShowTeamModal(true)
                                            }
                                            className="p-2 mb-2 bg-transparent border-none hover:bg-primary rounded text-secondary text-left w-full"
                                        >
                                            <svg
                                                className="inline-block align-middle"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z"
                                                    className="fill-primary"
                                                ></path>
                                            </svg>
                                            <span>Add Team</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!loading && data?.getTeams.length === 0 && (
                            <div className="addTeam py-4 px-5 bg-gray-600 flex flex-col items-center gap-y-4">
                                <button
                                    onClick={() => setShowTeamModal(true)}
                                    className="whitespace-nowrap w-full p-2 bg-transparent text-secondary border-dashed border-secondary"
                                >
                                    Agregar un team
                                </button>
                                <span className="whitespace-nowrap text-sm text-secondary">
                                    Aún no formas parte de un team
                                </span>
                            </div>
                        )}
                        <div className="project w-5/6 text-left">
                            <h4 className="text-secondary">Home</h4>
                            <ul className="pl-0">
                                <li className="list-none">
                                    <Link href="/u">
                                        <a className="text-dark-secondary bg-accent p-4 rounded-md flex items-center justify-start gap-x-1 no-underline">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z"
                                                    className="fill-dark-primary"
                                                />
                                            </svg>
                                            Home
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="project w-5/6 text-left">
                            <h4 className="text-secondary">Team</h4>
                            <ul className="pl-0">
                                <li
                                    onClick={viewProject}
                                    className="list-none cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between"
                                >
                                    <span className="text-dark-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="align-middle mr-1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2.5 6.96665L9.375 9.85832V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.6769 2.5 13.4083V6.96665ZM10.625 17.5V9.85832L17.5 6.96665V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z"
                                                className="fill-dark-primary"
                                            />
                                            <path
                                                d="M10 8.74999L17.0917 5.77499C16.9723 5.64239 16.8279 5.53476 16.6667 5.45832L10.6667 2.64999C10.4583 2.55135 10.2306 2.50018 10 2.50018C9.76943 2.50018 9.54174 2.55135 9.33333 2.64999L3.33333 5.45832C3.17213 5.53476 3.02768 5.64239 2.90833 5.77499L10 8.74999Z"
                                                className="fill-dark-primary"
                                            />
                                        </svg>
                                        <span>Projects</span>
                                    </span>
                                    <span className="text-dark-primary">
                                        {team.length}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="user-option w-5/6 text-left">
                            <h4 className="text-secondary">User</h4>
                            <ul className="pl-0">
                                <li
                                    onClick={() => signOut()}
                                    className="list-none cursor-pointer bg-accent p-4 rounded-md flex items-center justify-start"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        className="align-middle"
                                    >
                                        <path
                                            d="M10 4.99998C10.9167 4.99998 11.6667 5.74998 11.6667 6.66665C11.6667 7.58331 10.9167 8.33331 10 8.33331C9.08334 8.33331 8.33334 7.58331 8.33334 6.66665C8.33334 5.74998 9.08334 4.99998 10 4.99998ZM10 13.3333C12.25 13.3333 14.8333 14.4083 15 15H5.00001C5.19168 14.4 7.75834 13.3333 10 13.3333ZM10 3.33331C8.15834 3.33331 6.66668 4.82498 6.66668 6.66665C6.66668 8.50831 8.15834 9.99998 10 9.99998C11.8417 9.99998 13.3333 8.50831 13.3333 6.66665C13.3333 4.82498 11.8417 3.33331 10 3.33331ZM10 13.3333C7.77501 13.3333 3.33334 14.45 3.33334 16.6666V18.3333H16.6667V16.6666C16.6667 14.45 12.225 13.3333 10 13.3333Z"
                                            className="fill-dark-primary"
                                        />
                                    </svg>
                                    <span>Cerrar sesión</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section
                        ref={projectSideRef}
                        className="containera bg-[#313133] w-5/6 absolute md:static top-0 bottom-0 md:w-full transition-transform translate-x-[-100vw] md:translate-x-0 border-dark-primary border-0 border-r-dark-gray md:border-r-0.5 border-solid"
                    >
                        <div className="project-header bg-primary flex justify-between items-center py-4 px-2">
                            <div className="project-header-title inline-flex">
                                <h1 className="inline-block align-middle m-0 mr-2 text-primary text-sm uppercase">
                                    Projects
                                </h1>
                                <span className="inline-block text-secondary text-sm align-middle">
                                    {!loading && currentTeam?.id
                                        ? currentTeam.projects.length
                                        : 0}
                                </span>
                            </div>
                            <div className="expandir-add inline-flex items-center">
                                <button
                                    onClick={closeProjectSide}
                                    className="p-2 bg-transparent border-none hover:bg-cyan-500/[.5] text-[0px] rounded md:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        className="md:hidden"
                                        fill="none"
                                    >
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
                        <div className="team-list flex flex-col bg-secondary">
                            {currentTeam?.id &&
                                currentTeam.projects.map((team, index) => {
                                    return (
                                        <LayoutListTeam
                                            key={team.name + index}
                                            name={team.name}
                                            projectId={team.id}
                                            projects={team.projects}
                                        />
                                    );
                                })}
                            <button
                                onClick={() => setShowProjectModal(true)}
                                className="p-2 bg-transparent border-none hover:bg-green-500/[.5] text-[0px] rounded"
                            >
                                <svg
                                    className="inline-block align-middle"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z"
                                        className="fill-primary"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </section>
                </section>
                <Suspense>
                    <AddProject
                        refetch={refetch}
                        setShowModal={setShowProjectModal}
                        show={showProjectModal}
                    />
                    <AddTeam
                        refetch={refetch}
                        setShowModal={setShowTeamModal}
                        show={showTeamModal}
                    />
                </Suspense>
                {children}
            </main>
        </>
    );
}
