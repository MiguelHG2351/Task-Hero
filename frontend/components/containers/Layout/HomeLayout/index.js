import Link from "next/link";
import dynamic from "next/dynamic";

import { useState, useRef, Suspense } from "react"

const AddProject = dynamic(() => import('components/portals/AddProject'), {
  suspense: true,
})

import Header from "../../Header";

export default function HomeLayout({ children }) {

  const [showModal, setShowModal] = useState(false);
  const sidenavRef = useRef(null);


  return (
    <>
      <Header sidenavRef={sidenavRef} />
      <main className="relative min-h-[calc(100vh_-_45px)] md:h-[calc(100%_-_45px)] overflow-hidden md:grid md:grid-cols-[max-content_1fr]">
        <section
          ref={sidenavRef}
          className="sidenav-project border-dark-primary border-0 border-t-primary border-t-0.5 border-solid absolute md:static bg-black/[.6] h-[calc(100vh_-_45px)] left-0 top-0 w-screen md:w-auto md:inline-block transition-transform -translate-x-[100vw] md:translate-x-0">
          <div className="container w-5/6 md:w-fit">
            <div className="project-header bg-primary flex justify-between items-center py-4 px-2">
              <div className="project-header-title">
                <h1 className="inline-block align-middle m-0 mr-2 text-primary text-lg uppercase">
                  Menu
                </h1>
              </div>
            </div>
            <ul className="bg-secondary my-0 pl-0">
              <li className="list-none h-full">
                <Link href="/api/auth/signout">
                  <a className="box-border inline-block p-4 w-full no-underline text-primary">
                    Cerrar Sessión
                  </a>
                </Link>
              </li>
              <li
                onClick={() => setShowModal(true)}
                className="list-none h-full p-4 text-primary cursor-pointer">
                {/* <a className="box-border inline-block p-4 w-full no-underline text-primary"> */}
                Agregar Team
                {/* </a> */}
              </li>
            </ul>
          </div>
        </section>
        <Suspense>
          <AddProject setShowModal={setShowModal} show={showModal} />
        </Suspense>
        {children}
      </main>
    </>
  );
}
