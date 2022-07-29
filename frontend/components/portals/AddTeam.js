import classnames from "classnames";
import Portal from "components/containers/Portal";

import Firebase from "lib/firebase";
import createHash from "app/utils/createHash";

import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "app/apollo/projects";
import { useAppSelector } from "app/hook";
import { selectUser } from "app/redux/counterSlice";

const firebase = Firebase.getInstance();
const AddTeam = ({ setShowModal, show, refetch }) => {
    const selector = useAppSelector(selectUser);

    const portalClass = classnames(
        "modal fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] flex items-center justify-center",
        {
            hidden: !show,
        }
    );

    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_TEAM, {
        onCompleted(data) {
            refetch()
        }
    });

    async function formTeam(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("teamFile");
        const hash = 'team/' + createHash(image.name) + "." + image.name.split(".").pop();

        try {
            const url = await firebase.uploadFile(hash, image);
            mutateFunction({
                variables: {
                    data: {
                        userId: selector.id,
                        full_name: formData.get("teamName"),
                        image: `${url}`,
                    },
                },
            });
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
                <form onSubmit={formTeam} className="bg-primary rounded-lg p-4">
                    <h3 className="text-secondary">Ingrese Nombre del Team</h3>
                    <input
                        name="teamName"
                        className="p-2 rounded-md w-full box-border"
                        type="text"
                        placeholder="Ingrese el nombre del proyecto"
                    />
                    <h3 className="text-secondary">Agrega una imagen</h3>
                    <input
                        name="teamFile"
                        className="p-2 rounded-md w-full box-border"
                        type="file"
                        accept="image/*"
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

export default AddTeam;
