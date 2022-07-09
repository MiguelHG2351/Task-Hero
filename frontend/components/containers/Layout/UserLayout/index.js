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
import classNames from "classnames";

const AddTeam = dynamic(() => import("components/portals/AddTeam"), {
    suspense: true,
});

const Vault = dynamic(() => import("components/portals/Vault"), {
    suspense: true,
});

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
    const [showVaultInfo, setShowVaultInfo] = useState(false);
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
                    console.error(error);
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
                    className="sidenav-project z-10 box-border border-dark-primary border-0 border-t-primary border-t-0.5 border-solid absolute bg-black/[.6] h-[calc(100vh_-_45px)] left-0 top-0 w-screen md:flex md:static md:w-auto transition-transform -translate-x-[100vw] md:translate-x-0"
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
                                <li onClick={() => setShowVaultInfo(true)} className="list-none cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between mt-2">
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
                                                d="M0 7.48214C0 6.55862 0.366868 5.67292 1.0199 5.0199C1.67292 4.36687 2.55862 4 3.48214 4H16.0179C16.9414 4 17.8271 4.36687 18.4801 5.0199C19.1331 5.67292 19.5 6.55862 19.5 7.48214V13.0536C19.5 13.5109 19.4099 13.9637 19.2349 14.3861C19.0599 14.8086 18.8035 15.1925 18.4801 15.5158C18.1568 15.8392 17.7729 16.0957 17.3504 16.2707C16.9279 16.4456 16.4751 16.5357 16.0179 16.5357H3.48214C2.55862 16.5357 1.67292 16.1688 1.0199 15.5158C0.366868 14.8628 0 13.9771 0 13.0536V7.48214ZM5.77479 8.38193L4.875 9.28311L3.97521 8.38193C3.91046 8.31718 3.83359 8.26581 3.74899 8.23077C3.66439 8.19573 3.57371 8.17769 3.48214 8.17769C3.39057 8.17769 3.2999 8.19573 3.21529 8.23077C3.13069 8.26581 3.05382 8.31718 2.98907 8.38193C2.92432 8.44668 2.87296 8.52355 2.83791 8.60815C2.80287 8.69275 2.78483 8.78343 2.78483 8.875C2.78483 8.96657 2.80287 9.05725 2.83791 9.14185C2.87296 9.22645 2.92432 9.30332 2.98907 9.36807L3.89025 10.2679L2.98907 11.1676C2.92432 11.2324 2.87296 11.3093 2.83791 11.3939C2.80287 11.4785 2.78483 11.5691 2.78483 11.6607C2.78483 11.7523 2.80287 11.843 2.83791 11.9276C2.87296 12.0122 2.92432 12.089 2.98907 12.1538C3.11984 12.2846 3.29721 12.358 3.48214 12.358C3.57371 12.358 3.66439 12.34 3.74899 12.3049C3.83359 12.2699 3.91046 12.2185 3.97521 12.1538L4.875 11.2526L5.77479 12.1538C5.83954 12.2185 5.91641 12.2699 6.00101 12.3049C6.08561 12.34 6.17629 12.358 6.26786 12.358C6.35943 12.358 6.4501 12.34 6.53471 12.3049C6.61931 12.2699 6.69618 12.2185 6.76093 12.1538C6.82568 12.089 6.87704 12.0122 6.91209 11.9276C6.94713 11.843 6.96517 11.7523 6.96517 11.6607C6.96517 11.5691 6.94713 11.4785 6.91209 11.3939C6.87704 11.3093 6.82568 11.2324 6.76093 11.1676L5.85975 10.2679L6.76093 9.36807C6.82568 9.30332 6.87704 9.22645 6.91209 9.14185C6.94713 9.05725 6.96517 8.96657 6.96517 8.875C6.96517 8.78343 6.94713 8.69275 6.91209 8.60815C6.87704 8.52355 6.82568 8.44668 6.76093 8.38193C6.69618 8.31718 6.61931 8.26581 6.53471 8.23077C6.4501 8.19573 6.35943 8.17769 6.26786 8.17769C6.17629 8.17769 6.08561 8.19573 6.00101 8.23077C5.91641 8.26581 5.83954 8.31718 5.77479 8.38193ZM11.3462 8.38193L10.4464 9.28311L9.54664 8.38193C9.48189 8.31718 9.40502 8.26581 9.32042 8.23077C9.23582 8.19573 9.14514 8.17769 9.05357 8.17769C8.962 8.17769 8.87132 8.19573 8.78672 8.23077C8.70212 8.26581 8.62525 8.31718 8.5605 8.38193C8.49575 8.44668 8.44439 8.52355 8.40934 8.60815C8.3743 8.69275 8.35626 8.78343 8.35626 8.875C8.35626 8.96657 8.3743 9.05725 8.40934 9.14185C8.44439 9.22645 8.49575 9.30332 8.5605 9.36807L9.46168 10.2679L8.5605 11.1676C8.49575 11.2324 8.44439 11.3093 8.40934 11.3939C8.3743 11.4785 8.35626 11.5691 8.35626 11.6607C8.35626 11.7523 8.3743 11.843 8.40934 11.9276C8.44439 12.0122 8.49575 12.089 8.5605 12.1538C8.69127 12.2846 8.86863 12.358 9.05357 12.358C9.14514 12.358 9.23582 12.34 9.32042 12.3049C9.40502 12.2699 9.48189 12.2185 9.54664 12.1538L10.4464 11.2526L11.3462 12.1538C11.477 12.2846 11.6543 12.358 11.8393 12.358C12.0242 12.358 12.2016 12.2846 12.3324 12.1538C12.4631 12.023 12.5366 11.8457 12.5366 11.6607C12.5366 11.4758 12.4631 11.2984 12.3324 11.1676L11.4312 10.2679L12.3324 9.36807C12.4631 9.2373 12.5366 9.05994 12.5366 8.875C12.5366 8.69006 12.4631 8.5127 12.3324 8.38193C12.2016 8.25116 12.0242 8.17769 11.8393 8.17769C11.6543 8.17769 11.477 8.25116 11.3462 8.38193ZM13.9286 11.6607C13.9286 11.8454 14.0019 12.0226 14.1326 12.1532C14.2632 12.2838 14.4403 12.3571 14.625 12.3571H16.0179C16.2026 12.3571 16.3797 12.2838 16.5103 12.1532C16.6409 12.0226 16.7143 11.8454 16.7143 11.6607C16.7143 11.476 16.6409 11.2989 16.5103 11.1683C16.3797 11.0377 16.2026 10.9643 16.0179 10.9643H14.625C14.4403 10.9643 14.2632 11.0377 14.1326 11.1683C14.0019 11.2989 13.9286 11.476 13.9286 11.6607Z"
                                                className="fill-dark-primary"
                                            />
                                        </svg>
                                        <span>Vault</span>
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
                    <Vault show={showVaultInfo} setShowModal={setShowVaultInfo} refetch={refetch} />
                </Suspense>
                {children}
            </main>
        </>
    );
}
