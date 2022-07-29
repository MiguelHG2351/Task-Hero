import classnames from "classnames";
import Portal from "components/containers/Portal";

import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "app/apollo/projects";
import { useAppSelector } from "app/hook";
import { selectCurrentTeam } from "app/redux/counterSlice";
import createHash from "app/utils/createHash";
import Firebase from "lib/firebase";

const firebase = Firebase.getInstance();
const AddProject = ({ setShowModal, show, refetch }) => {
    const selector = useAppSelector(selectCurrentTeam);

    const portalClass = classnames(
        "modal fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] flex items-center justify-center",
        {
            hidden: !show,
        }
    );

    const [mutateFunction, { data, loading, error }] =
        useMutation(CREATE_PROJECT, {
            onQueryUpdated(observableQuery) {
                return observableQuery.refetch();
            },
            onCompleted(data) {
                refetch();
            }
        });

    async function formProject(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("projectFile");
        const hash =
            "project/" +
            createHash(image.name) +
            "." +
            image.name.split(".").pop();

        try {
            const url = await firebase.uploadFile(hash, image);
            mutateFunction({
                variables: {
                    data: {
                        teamId: selector.id,
                        name: formData.get("projectName"),
                        description: formData.get("projectDescription"),
                        image: `${url}`,
                    },
                },
            });
            console.log('paso 1');
            refetch();
            setShowModal(false);
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
                    className="bg-primary rounded-lg p-4"
                >
                    <h3 className="text-secondary">
                        Ingrese Nombre del proyecto
                    </h3>
                    <input
                        name="projectName"
                        className="p-2 rounded-md w-full box-border"
                        type="text"
                        placeholder="Ingrese el nombre del proyecto"
                    />
                    <h3 className="text-secondary">Agrega una imagen</h3>
                    <input
                        name="projectFile"
                        className="p-2 rounded-md w-full box-border"
                        type="file"
                        accept="image/*"
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

export default AddProject;
