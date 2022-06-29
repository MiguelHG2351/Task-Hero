import Head from 'next/head'
import Image from 'next/future/image'
import Counter from 'components/Counter'
// import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
    // const data = useSession()

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <picture className="header-home">
                <source srcSet="/images/examples/background-project.png" media="(min-width: 768px)" />
                <img className='inline-block align-middle' src="/images/examples/background-project.png" alt="imagen" />
            </picture>
            <div className="project-info flex justify-between items-center p-2 px-3">
                <div className="project-name flex justify-start items-center gap-x-3">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 6.96667L9.375 9.85833V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.677 2.5 13.4083V6.96667ZM10.625 17.5V9.85833L17.5 6.96667V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z" fill="#ACACAC"/>
                            <path d="M10 8.75L17.0917 5.775C16.9723 5.6424 16.8279 5.53477 16.6667 5.45833L10.6667 2.65C10.4583 2.55136 10.2306 2.5002 10 2.5002C9.76943 2.5002 9.54174 2.55136 9.33333 2.65L3.33333 5.45833C3.17213 5.53477 3.02768 5.6424 2.90833 5.775L10 8.75Z" fill="#ACACAC"/>
                            <path d="M15 10.5C13.0672 10.5 11.5 12.0672 11.5 14C11.5 15.9328 13.0672 17.5 15 17.5C16.9328 17.5 18.5 15.9328 18.5 14C18.5 12.0672 16.9328 10.5 15 10.5ZM16.3789 15.0758L16.1555 15.3805C16.1506 15.3871 16.1445 15.3927 16.1375 15.397C16.1304 15.4012 16.1226 15.4041 16.1145 15.4053C16.1063 15.4065 16.0981 15.4061 16.0901 15.4042C16.0821 15.4022 16.0746 15.3986 16.068 15.3938L14.7758 14.4516C14.7677 14.4458 14.7612 14.4382 14.7567 14.4293C14.7522 14.4205 14.7499 14.4107 14.75 14.4008V12.25C14.75 12.2156 14.7781 12.1875 14.8125 12.1875H15.1883C15.2227 12.1875 15.2508 12.2156 15.2508 12.25V14.1836L16.3648 14.9891C16.393 15.0086 16.3992 15.0477 16.3789 15.0758Z" fill="white"/>
                        </svg>
                    </span>
                    <h1 className='text-lg text-primary m-0'>Real Stable website</h1>
                </div>
                <div className="user-in-project inline-flex items-center gap-x-3">
                    <div className="user-list flex -space-x-2">
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} className="align-middle" src="/images/examples/user.png" />
                        </div>
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} className="align-middle" src="/images/examples/user.png" />
                        </div>
                        <div className="user-list-image ring-2 rounded-full">
                            <Image width={24} height={24} className="align-middle" src="/images/examples/user.png" />
                        </div>
                    </div>
                    <div className="add-user">
                        <button className="rounded-full p-2 border-none bg-gray-500">
                            <svg className='inline-block align-middle' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12.6667 8.66666H8.66666V12.6667H7.33333V8.66666H3.33333V7.33333H7.33333V3.33333H8.66666V7.33333H12.6667V8.66666Z" className='fill-primary'/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <nav className="option-nav-project">
                <ul className='list-none flex mb-4 mt-1 px-3 gap-x-2 overflow-x-auto whitespace-nowrap'>
                    <li className='text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]'>About</li>
                    <li className='text-primary border-dark-primary border-b-primary border-b-2 border-solid rounded py-2 px-1 select-none hover:bg-white/[.2]'>Board</li>
                    <li className='text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]'>Timeline</li>
                    <li className='text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]'>Stats</li>
                    <li className='text-secondary border-dark-primary border-b-2 border-solid rounded-lg py-2 px-1 select-none hover:bg-white/[.2]'>Calendar</li>
                </ul>
            </nav>
            <div className="option-filter inline-flex gap-x-1 bg-dark-secondary mb-4 ml-3 px-2 py-2 rounded-md">
                <button className='bg-dark-primary text-white border-none rounded px-3 py-1'>
                    Low
                </button>
                <button className='bg-transparent text-white border-none rounded ml-3 px-2 py-2'>
                    Medium
                </button>
                <button className='bg-dark-primary text-white border-none rounded ml-3 px-2 py-2'>
                    Hight
                </button>
            </div>
            <section className="card-list px-4 py-4 bg-secondary">
                <article>
                    <header className='border-dark-secondary border-b-primary border-b-0.5 border-solid flex items-center justify-between'>
                        <h2 className='text-primary text-sm bg-primary p-2 rounded-md font-bold'>Upcoming <span className='text-secondary'>&#40;1&#41;</span></h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M4.99999 8.83333C4.08333 8.83333 3.33333 9.58333 3.33333 10.5C3.33333 11.4167 4.08333 12.1667 4.99999 12.1667C5.91666 12.1667 6.66666 11.4167 6.66666 10.5C6.66666 9.58333 5.91666 8.83333 4.99999 8.83333ZM15 8.83333C14.0833 8.83333 13.3333 9.58333 13.3333 10.5C13.3333 11.4167 14.0833 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58333 15.9167 8.83333 15 8.83333ZM9.99999 8.83333C9.08333 8.83333 8.33333 9.58333 8.33333 10.5C8.33333 11.4167 9.08333 12.1667 9.99999 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58333 10.9167 8.83333 9.99999 8.83333Z" className='fill-primary'/>
                        </svg>
                    </header>
                    <ul className='pl-0'>
                        <li className='list-none bg-primary px-4 py-4 rounded-lg'>
                            <div className="item-title flex items-center gap-x-2  justify-between">
                                <h3 className='text-primary m-0'>Mobile Response</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M4.99999 8.83333C4.08333 8.83333 3.33333 9.58333 3.33333 10.5C3.33333 11.4167 4.08333 12.1667 4.99999 12.1667C5.91666 12.1667 6.66666 11.4167 6.66666 10.5C6.66666 9.58333 5.91666 8.83333 4.99999 8.83333ZM15 8.83333C14.0833 8.83333 13.3333 9.58333 13.3333 10.5C13.3333 11.4167 14.0833 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58333 15.9167 8.83333 15 8.83333ZM9.99999 8.83333C9.08333 8.83333 8.33333 9.58333 8.33333 10.5C8.33333 11.4167 9.08333 12.1667 9.99999 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58333 10.9167 8.83333 9.99999 8.83333Z" className='fill-primary'/>
                                </svg>
                            </div>
                            <div className="item-preview my-4">
                                <span className='inline-flex items-center gap-x-2 mr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99999 9.08333C9.49166 9.08333 9.08332 9.49166 9.08332 10C9.08332 10.5083 9.49166 10.9167 9.99999 10.9167C10.5083 10.9167 10.9167 10.5083 10.9167 10C10.9167 9.49166 10.5083 9.08333 9.99999 9.08333ZM9.99999 1.66666C5.39999 1.66666 1.66666 5.4 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66666 9.99999 1.66666ZM11.825 11.825L4.99999 15L8.17499 8.175L15 5L11.825 11.825Z" className='fill-secondary'/>
                                    </svg>
                                    <strong className='text-primary'>3</strong>
                                </span>
                                <span className='inline-flex items-center gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M18.0527 6.60938C17.6145 5.56353 16.977 4.61293 16.1758 3.81055C15.3769 3.00678 14.428 2.36773 13.3828 1.92969C12.3121 1.47878 11.1617 1.24764 9.99999 1.25H9.96093C8.77929 1.25586 7.63671 1.49024 6.56054 1.95117C5.52435 2.3937 4.58431 3.03389 3.79296 3.83594C2.99946 4.63651 2.36927 5.58379 1.93749 6.625C1.48928 7.70774 1.26217 8.8692 1.26952 10.041C1.27538 11.3965 1.5996 12.7422 2.20507 13.9453V16.9141C2.20507 17.4102 2.60741 17.8125 3.10155 17.8125H6.0664C7.27513 18.4224 8.60899 18.7434 9.96288 18.75H10.0039C11.1719 18.75 12.3027 18.5234 13.3691 18.0801C14.409 17.6473 15.3544 17.0157 16.1523 16.2207C16.957 15.4219 17.5898 14.4883 18.0332 13.4473C18.4922 12.3691 18.7266 11.2227 18.7324 10.0391C18.7363 8.84961 18.5058 7.69531 18.0527 6.60938ZM6.10155 10.9375C5.58593 10.9375 5.16601 10.5176 5.16601 10C5.16601 9.48242 5.58593 9.0625 6.10155 9.0625C6.61718 9.0625 7.0371 9.48242 7.0371 10C7.0371 10.5176 6.61913 10.9375 6.10155 10.9375ZM9.99999 10.9375C9.48436 10.9375 9.06444 10.5176 9.06444 10C9.06444 9.48242 9.48436 9.0625 9.99999 9.0625C10.5156 9.0625 10.9355 9.48242 10.9355 10C10.9355 10.5176 10.5156 10.9375 9.99999 10.9375ZM13.8984 10.9375C13.3828 10.9375 12.9629 10.5176 12.9629 10C12.9629 9.48242 13.3828 9.0625 13.8984 9.0625C14.4141 9.0625 14.834 9.48242 14.834 10C14.834 10.5176 14.4141 10.9375 13.8984 10.9375Z" className='fill-secondary'/>
                                    </svg>
                                    <strong className='text-primary'>3</strong>
                                </span>
                            </div>
                            <div className="item-tags">
                                <span className='bg-cyan-600 inline-block py-2 px-4 rounded-md text-white'>Low</span>
                            </div>
                        </li>
                    </ul>
                    <button className='bg-transparent border-dashed border-secondary w-full py-3 text-secondary text-lg'>
                        <svg className='align-middle' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 8.66667H8.66668V12.6667H7.33334V8.66667H3.33334V7.33333H7.33334V3.33333H8.66668V7.33333H12.6667V8.66667Z" fill="#ACACAC"/>
                        </svg>
                        <span>New Board</span>
                    </button>
                </article>
                <article>
                    <header className='border-dark-secondary border-b-primary border-b-0.5 border-solid flex items-center justify-between'>
                        <h2 className='text-primary text-sm bg-primary p-2 rounded-md font-bold'>In progress <span className='text-secondary'>&#40;3&#41;</span></h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M4.99999 8.83333C4.08333 8.83333 3.33333 9.58333 3.33333 10.5C3.33333 11.4167 4.08333 12.1667 4.99999 12.1667C5.91666 12.1667 6.66666 11.4167 6.66666 10.5C6.66666 9.58333 5.91666 8.83333 4.99999 8.83333ZM15 8.83333C14.0833 8.83333 13.3333 9.58333 13.3333 10.5C13.3333 11.4167 14.0833 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58333 15.9167 8.83333 15 8.83333ZM9.99999 8.83333C9.08333 8.83333 8.33333 9.58333 8.33333 10.5C8.33333 11.4167 9.08333 12.1667 9.99999 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58333 10.9167 8.83333 9.99999 8.83333Z" className='fill-primary'/>
                        </svg>
                    </header>
                    <ul className='pl-0'>
                        <li className='list-none bg-primary px-4 py-4 rounded-lg'>
                            <div className="item-title flex items-center gap-x-2  justify-between">
                                <h3 className='text-primary m-0'>Mobile Response</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M4.99999 8.83333C4.08333 8.83333 3.33333 9.58333 3.33333 10.5C3.33333 11.4167 4.08333 12.1667 4.99999 12.1667C5.91666 12.1667 6.66666 11.4167 6.66666 10.5C6.66666 9.58333 5.91666 8.83333 4.99999 8.83333ZM15 8.83333C14.0833 8.83333 13.3333 9.58333 13.3333 10.5C13.3333 11.4167 14.0833 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58333 15.9167 8.83333 15 8.83333ZM9.99999 8.83333C9.08333 8.83333 8.33333 9.58333 8.33333 10.5C8.33333 11.4167 9.08333 12.1667 9.99999 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58333 10.9167 8.83333 9.99999 8.83333Z" className='fill-primary'/>
                                </svg>
                            </div>
                            <div className="item-preview my-4">
                                <span className='inline-flex items-center gap-x-2 mr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99999 9.08333C9.49166 9.08333 9.08332 9.49166 9.08332 10C9.08332 10.5083 9.49166 10.9167 9.99999 10.9167C10.5083 10.9167 10.9167 10.5083 10.9167 10C10.9167 9.49166 10.5083 9.08333 9.99999 9.08333ZM9.99999 1.66666C5.39999 1.66666 1.66666 5.4 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66666 9.99999 1.66666ZM11.825 11.825L4.99999 15L8.17499 8.175L15 5L11.825 11.825Z" className='fill-secondary'/>
                                    </svg>
                                    <strong className='text-primary'>3</strong>
                                </span>
                                <span className='inline-flex items-center gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M18.0527 6.60938C17.6145 5.56353 16.977 4.61293 16.1758 3.81055C15.3769 3.00678 14.428 2.36773 13.3828 1.92969C12.3121 1.47878 11.1617 1.24764 9.99999 1.25H9.96093C8.77929 1.25586 7.63671 1.49024 6.56054 1.95117C5.52435 2.3937 4.58431 3.03389 3.79296 3.83594C2.99946 4.63651 2.36927 5.58379 1.93749 6.625C1.48928 7.70774 1.26217 8.8692 1.26952 10.041C1.27538 11.3965 1.5996 12.7422 2.20507 13.9453V16.9141C2.20507 17.4102 2.60741 17.8125 3.10155 17.8125H6.0664C7.27513 18.4224 8.60899 18.7434 9.96288 18.75H10.0039C11.1719 18.75 12.3027 18.5234 13.3691 18.0801C14.409 17.6473 15.3544 17.0157 16.1523 16.2207C16.957 15.4219 17.5898 14.4883 18.0332 13.4473C18.4922 12.3691 18.7266 11.2227 18.7324 10.0391C18.7363 8.84961 18.5058 7.69531 18.0527 6.60938ZM6.10155 10.9375C5.58593 10.9375 5.16601 10.5176 5.16601 10C5.16601 9.48242 5.58593 9.0625 6.10155 9.0625C6.61718 9.0625 7.0371 9.48242 7.0371 10C7.0371 10.5176 6.61913 10.9375 6.10155 10.9375ZM9.99999 10.9375C9.48436 10.9375 9.06444 10.5176 9.06444 10C9.06444 9.48242 9.48436 9.0625 9.99999 9.0625C10.5156 9.0625 10.9355 9.48242 10.9355 10C10.9355 10.5176 10.5156 10.9375 9.99999 10.9375ZM13.8984 10.9375C13.3828 10.9375 12.9629 10.5176 12.9629 10C12.9629 9.48242 13.3828 9.0625 13.8984 9.0625C14.4141 9.0625 14.834 9.48242 14.834 10C14.834 10.5176 14.4141 10.9375 13.8984 10.9375Z" className='fill-secondary'/>
                                    </svg>
                                    <strong className='text-primary'>3</strong>
                                </span>
                            </div>
                            <div className="item-tags">
                                <span className='bg-cyan-600 inline-block py-2 px-4 rounded-md text-white'>Low</span>
                            </div>
                        </li>
                    </ul>
                    <button className='bg-transparent border-dashed border-secondary w-full py-3 text-secondary text-lg'>
                        <svg className='align-middle' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 8.66667H8.66668V12.6667H7.33334V8.66667H3.33334V7.33333H7.33334V3.33333H8.66668V7.33333H12.6667V8.66667Z" fill="#ACACAC"/>
                        </svg>
                        <span>New Board</span>
                    </button>
                </article>
            </section>
            <Counter />
            {/* <div className="login"> */}
                {/* <button onClick={() => signIn()}>Login</button>
                <button onClick={() => signOut()}>Logout</button>
            </div> */}
        </>
    )
}

// export async function getServerSideProps(context) {
    
// }
