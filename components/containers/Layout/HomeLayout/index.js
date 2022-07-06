import Link from "next/link";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "app/apollo/projects";
import { useAppSelector } from "app/hook";
import { selectUser } from "app/redux/counterSlice";

import Header from "../../Header";

export default function HomeLayout({ children }) {
  const selector = useAppSelector(selectUser)

  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_TEAM);
  const sidenavRef = useRef(null);
  const modalRef = useRef(null);

  function closeModal(e) {
    modalRef.current.classList.replace("flex", "hidden");
  }

  function addTeamHandler(e) {
    modalRef.current.classList.replace("hidden", "flex");
  }

  function formTeam(e) {
    e.preventDefault();
    const formData = new FormData(e.target)

    console.log('El nombre es ', formData.get("projectDescription"))
    console.log('El errro se debe a que ', error)
    mutateFunction({
      variables: {
        "userId": selector.id,
        "full_name": formData.get('projectName'),
        "vaultId": 12
      }
    })
  }

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
                onClick={addTeamHandler}
                className="list-none h-full p-4 text-primary cursor-pointer">
                {/* <a className="box-border inline-block p-4 w-full no-underline text-primary"> */}
                Agregar Team
                {/* </a> */}
              </li>
            </ul>
          </div>
        </section>
        <div
          ref={modalRef}
          className="modal hidden fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] items-center justify-center">
          <form onSubmit={formTeam} className="bg-primary rounded-lg p-4">
            <h3 className="text-secondary">Ingrese Nombre del proyecto</h3>
            <input
              name="projectName"
              className="p-2 rounded-md w-full box-border"
              type="text"
              placeholder="Ingrese el nombre del proyecto"
            />
            <h3 className="text-secondary">Description</h3>
            <input
              name="projectDescription"
              className="p-2 rounded-md w-full box-border"
              type="text"
              placeholder="Ingrese la descripción del proyecto"
            />
            <div className="project-option flex gap-x-2 items-center">
              <button
                type="submit"
                className="block bg-blue-700 py-2 px-4 rounded-md text-secondary mt-4 border-none">
                Save
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="block bg-red-700 py-2 px-4 rounded-md text-secondary mt-4 border-none">
                Cancel
              </button>
            </div>
          </form>
        </div>
        {children}
      </main>
    </>
  );
}
