import Image from "next/future/image";
import { motion } from "framer-motion";

export default function MenuProject({ name }) {
  return (
    <motion.section className="menu-project">
      <picture className="header-home">
        <source
          srcSet="/images/examples/background-project.png"
          media="(min-width: 768px)"
        />
        <Image
          className="inline-block align-middle w-full"
          src="/images/examples/background-project.png"
          alt="imagen"
        />
      </picture>
      <div className="project-info grid grid-cols-[minmax(0,_1fr)_min-content] justify-between items-center p-2 px-3">
        <div className="project-namea flex justify-start items-center gap-x-3">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 6.96667L9.375 9.85833V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.677 2.5 13.4083V6.96667ZM10.625 17.5V9.85833L17.5 6.96667V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z"
                fill="#ACACAC"
              />
              <path
                d="M10 8.75L17.0917 5.775C16.9723 5.6424 16.8279 5.53477 16.6667 5.45833L10.6667 2.65C10.4583 2.55136 10.2306 2.5002 10 2.5002C9.76943 2.5002 9.54174 2.55136 9.33333 2.65L3.33333 5.45833C3.17213 5.53477 3.02768 5.6424 2.90833 5.775L10 8.75Z"
                fill="#ACACAC"
              />
              <path
                d="M15 10.5C13.0672 10.5 11.5 12.0672 11.5 14C11.5 15.9328 13.0672 17.5 15 17.5C16.9328 17.5 18.5 15.9328 18.5 14C18.5 12.0672 16.9328 10.5 15 10.5ZM16.3789 15.0758L16.1555 15.3805C16.1506 15.3871 16.1445 15.3927 16.1375 15.397C16.1304 15.4012 16.1226 15.4041 16.1145 15.4053C16.1063 15.4065 16.0981 15.4061 16.0901 15.4042C16.0821 15.4022 16.0746 15.3986 16.068 15.3938L14.7758 14.4516C14.7677 14.4458 14.7612 14.4382 14.7567 14.4293C14.7522 14.4205 14.7499 14.4107 14.75 14.4008V12.25C14.75 12.2156 14.7781 12.1875 14.8125 12.1875H15.1883C15.2227 12.1875 15.2508 12.2156 15.2508 12.25V14.1836L16.3648 14.9891C16.393 15.0086 16.3992 15.0477 16.3789 15.0758Z"
                fill="white"
              />
            </svg>
          </span>
          <h1 className="text-lg text-primary m-0 whitespace-nowrap text-ellipsis overflow-hidden">{name}</h1>
        </div>
        <div className="user-in-project w-auto inline-flex items-center justify-end gap-x-3">
          <div className="user-list flex -space-x-2">
            <div className="user-list-image ring-2 rounded-full">
              <Image
                width={24}
                height={24}
                className="align-middle"
                src="/images/examples/user.png"
              />
            </div>
            <div className="user-list-image ring-2 rounded-full">
              <Image
                width={24}
                height={24}
                className="align-middle"
                src="/images/examples/user.png"
              />
            </div>
            <div className="user-list-image ring-2 rounded-full">
              <Image
                width={24}
                height={24}
                className="align-middle"
                src="/images/examples/user.png"
              />
            </div>
          </div>
          <div className="add-user">
            <button className="rounded-full p-2 border-none bg-gray-500">
              <svg
                className="inline-block align-middle"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                  d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z"
                  className="fill-primary"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className="option-nav-project">
        <ul className="list-none flex mb-4 mt-1 px-3 gap-x-2 overflow-x-auto whitespace-nowrap">
          <li className="text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]">
            About
          </li>
          <li className="text-primary border-dark-primary border-b-primary border-b-2 border-solid rounded py-2 px-1 select-none hover:bg-white/[.2]">
            Board
          </li>
          <li className="text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]">
            Timeline
          </li>
          <li className="text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]">
            Stats
          </li>
          <li className="text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]">
            Calendar
          </li>
        </ul>
      </nav>
      <div className="option-filter inline-flex gap-x-1 bg-dark-secondary mb-4 ml-3 px-2 py-2 rounded-md">
        <button className="bg-dark-primary text-white border-none rounded px-3 py-1">
          Low
        </button>
        <button className="bg-transparent text-white border-none rounded ml-3 px-2 py-2">
          Medium
        </button>
        <button className="bg-dark-primary text-white border-none rounded ml-3 px-2 py-2">
          Hight
        </button>
      </div>
    </motion.section>
  );
}
