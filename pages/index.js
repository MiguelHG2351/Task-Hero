import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
    const data = useSession()

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <img src="/images/examples/background-project.png" alt="imagen" />
            <div className="project-info flex justify-between items-center p-3">
                <div className="project-name flex justify-start items-center gap-x-3">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 6.96667L9.375 9.85833V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.677 2.5 13.4083V6.96667ZM10.625 17.5V9.85833L17.5 6.96667V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z" fill="#ACACAC"/>
                            <path d="M10 8.75L17.0917 5.775C16.9723 5.6424 16.8279 5.53477 16.6667 5.45833L10.6667 2.65C10.4583 2.55136 10.2306 2.5002 10 2.5002C9.76943 2.5002 9.54174 2.55136 9.33333 2.65L3.33333 5.45833C3.17213 5.53477 3.02768 5.6424 2.90833 5.775L10 8.75Z" fill="#ACACAC"/>
                            <path d="M15 10.5C13.0672 10.5 11.5 12.0672 11.5 14C11.5 15.9328 13.0672 17.5 15 17.5C16.9328 17.5 18.5 15.9328 18.5 14C18.5 12.0672 16.9328 10.5 15 10.5ZM16.3789 15.0758L16.1555 15.3805C16.1506 15.3871 16.1445 15.3927 16.1375 15.397C16.1304 15.4012 16.1226 15.4041 16.1145 15.4053C16.1063 15.4065 16.0981 15.4061 16.0901 15.4042C16.0821 15.4022 16.0746 15.3986 16.068 15.3938L14.7758 14.4516C14.7677 14.4458 14.7612 14.4382 14.7567 14.4293C14.7522 14.4205 14.7499 14.4107 14.75 14.4008V12.25C14.75 12.2156 14.7781 12.1875 14.8125 12.1875H15.1883C15.2227 12.1875 15.2508 12.2156 15.2508 12.25V14.1836L16.3648 14.9891C16.393 15.0086 16.3992 15.0477 16.3789 15.0758Z" fill="white"/>
                        </svg>
                    </span>
                    <h1 className='text-lg text-white'>Real Stable website</h1>
                </div>
                <div className="user-in-project inline-flex items-center gap-x-3">
                    <div className="user-list flex -space-x-2">
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} src="/images/examples/user.png" />
                        </div>
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} src="/images/examples/user.png" />
                        </div>
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} src="/images/examples/user.png" />
                        </div>
                    </div>
                    <div className="add-user">
                        <button className="rounded-full p-2 border-none bg-gray-500">
                            <svg className='inline-block align-middle' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={() => signIn()}>Login</button>
            <button onClick={() => signOut()}>Logout</button>
            <p>{data.data?.user.name}</p>
        </>
    )
}