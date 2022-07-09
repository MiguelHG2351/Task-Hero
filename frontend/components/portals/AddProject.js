import classnames from "classnames"
import Portal from "components/containers/Portal";

import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "app/apollo/projects";

const AddProject = ({ setShowModal, show }) => {

  const portalClass = classnames('modal fixed bg-black/[.7] top-[45px] left-0 w-full h-[calc(100vh_-_45px)] flex items-center justify-center',{
    'hidden': !show
  })

  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_TEAM);

  function formTeam(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    
    mutateFunction({
      variables: {
        "userId": selector.id,
        "full_name": formData.get('projectName'),
        "vaultId": 12
      }
    })
  }

  return (
    <Portal>
      <div
        className={portalClass}>
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
              onClick={() => setShowModal(false)}
              type="button"
              className="block bg-red-700 py-2 px-4 rounded-md text-secondary mt-4 border-none">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Portal>
  );
};

export default AddProject;
