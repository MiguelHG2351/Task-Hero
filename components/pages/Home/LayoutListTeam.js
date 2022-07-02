import HomeListProject from "components/pages/Home/HomeListProject";

export default function LayoutListTeam({ name, projects}) {
    console.log(projects)
    
    return (
        <section className="team-item py-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.5 6.96665L9.375 9.85832V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.6769 2.5 13.4083V6.96665ZM10.625 17.5V9.85832L17.5 6.96665V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z" fill="#3D3C3F"/>
                <path d="M10 8.74999L17.0917 5.77499C16.9723 5.64239 16.8279 5.53476 16.6667 5.45832L10.6667 2.64999C10.4583 2.55135 10.2306 2.50018 10 2.50018C9.76943 2.50018 9.54174 2.55135 9.33333 2.64999L3.33333 5.45832C3.17213 5.53476 3.02768 5.64239 2.90833 5.77499L10 8.74999Z" fill="#3D3C3F"/>
            </svg>
            <h2 className="m-0 text-primary text-lg">Proyecto: {name}</h2>.
            <ul>
                {projects.map((project, index) => (
                    <HomeListProject key={project.name + index} name={project.name} />
                ))
                }
            </ul>
        </section>
    )
}