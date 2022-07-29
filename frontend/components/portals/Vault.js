import classnames from "classnames";
import Portal from "components/containers/Portal";

import { useMutation } from "@apollo/client";
import { CREATE_SECRET } from "app/apollo/projects";
import { useAppSelector } from "app/hook";
import { selectCurrentTeam } from "app/redux/counterSlice";

const Vault = ({ setShowModal, show, refetch }) => {
    const selector = useAppSelector(selectCurrentTeam);

    const portalClass = classnames(
        "modal bg-primary z-20 fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] flex flex-col items-center justify-start overflow-y-auto",
        {
            hidden: !show,
        }
    );

    const [mutateFunction, { data, loading, error }] =
        useMutation(CREATE_SECRET, {
            onCompleted() {
                refetch();
            }
        });

    async function formProject(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clave = formData.get("key");
        const valor = formData.get("value");
        try {
            mutateFunction({
                variables: {
                    data: {
                        "name": clave,
                        "value": valor,
                        "teamId": selector.id,
                        "vaultTeamId": selector.vaulTeam[0].id
                    },
                },
            });
            refetch();
        } catch (error) {
            console.error(error);
        }
        e.target.reset();
    }

    return (
        <Portal>
            <div className={portalClass}>
                <div className="keys w-11/12 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2">
                    {selector?.vaulTeam &&
                        selector.vaulTeam[0].secrets.map((key) => {
                            return (
                                <div key={key.id + key.name} className="bg-secondary flex flex-col items-start p-2">
                                    <h3 className="text-secondary text-sm m-0">
                                        Clave: {key.name}
                                    </h3>
                                    <span className="text-lg text-primary">Valor: {key.value}</span>
                                </div>
                            );
                        })}
                </div>
                <form
                    onSubmit={formProject}
                    className="bg-primary rounded-lg p-4"
                >
                    <div className="key">
                        <h3 className="text-secondary">Clave</h3>
                        <input
                            name="key"
                            className="p-2 rounded-md w-full box-border"
                            type="text"
                            placeholder="Ingrese el nombre del proyecto"
                        />
                    </div>
                    <div className="value">
                        <h3 className="text-secondary">Valor</h3>
                        <input
                            name="value"
                            className="p-2 rounded-md w-full box-border"
                            type="text"
                            placeholder="Ingrese la descripción del proyecto"
                        />
                    </div>
                    <div className="project-option flex gap-x-2 items-center">
                        <button
                            type="submit"
                            className="block bg-blue-700 py-2 px-4 rounded-md text-secondary mt-4 border-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <button className="w-5/6 bg-red-700 border-none px-4 py-2 text-sm font-bold" onClick={() => setShowModal(false)}>Close</button>
            </div>
        </Portal>
    );
};

export default Vault;
