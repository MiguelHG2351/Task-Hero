import classnames from "classnames";
import Portal from "components/containers/Portal";

import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "app/apollo/projects";
import { useAppSelector } from "app/hook";
import { selectCurrentTeam } from "app/redux/counterSlice";

const AddCard = ({ setShowModal, showInfo, refetch }) => {
    const selector = useAppSelector(selectCurrentTeam);

    const portalClass = classnames(
        "modal fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] flex items-center justify-center",
        {
            hidden: !showInfo.show,
        }
    );

    const [mutateFunction, { data, loading, error }] =
        useMutation(CREATE_CARD, {
            updateQueries: (observableQuery) => {
                return observableQuery.refetch()
            },
            onCompleted() {
                refetch()
            }
        });

    async function formProject(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            mutateFunction({
                variables: {
                    data: {
                        tableId: showInfo.tableId,
                        name: formData.get("cardName"),
                        description: formData.get("cardDescription"),
                        category: formData.get("cardCategory"),
                    },
                },
            });
            refetch();
            setShowModal({...showInfo, show: false});
        } catch (error) {
            console.error(error);
        }
        e.target.reset();
    }

    return (
        <Portal>
            <div className={portalClass}>
                <form
                    onSubmit={formProject}
                    className="bg-primary rounded-lg p-5 px-8 max-w-full"
                >
                    <h3 className="text-secondary">
                        Nombre del Card
                    </h3>
                    <input
                        name="cardName"
                        className="p-2 rounded-md w-full box-border"
                        type="text"
                        placeholder="Ingrese el nombre del proyecto"
                    />
                    <h3 className="text-secondary">Description</h3>
                    <input
                        name="cardDescription"
                        className="p-2 rounded-md w-full box-border"
                        type="text"
                        placeholder="Ingrese la descripción del proyecto"
                    />
                    <h3 className="text-secondary">Categoria</h3>
                    <input
                        name="cardCategory"
                        className="p-2 rounded-md w-full box-border"
                        type="text"
                        placeholder="Ingrese la descripción del proyecto"
                    />
                    <div className="project-option flex gap-x-2 items-center">
                        <button
                            type="submit"
                            className="block bg-blue-700 py-2 px-4 rounded-md text-secondary mt-4 border-none"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            type="button"
                            className="block bg-red-700 py-2 px-4 rounded-md text-secondary mt-4 border-none"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Portal>
    );
};

export default AddCard;
