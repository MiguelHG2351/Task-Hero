import Link from "next/link";

export default function TeamList({ teamId, name, projects = [], vault = [], user=[] }) {
  
  return (
    <Link href={`/u/team/${teamId}`}>
      <a className="block bg-secondary px-2 rounded-md hover:scale-105 transition-transform no-underline">
        <div className="team-title flex items-center justify-between">
          <h3 className="text-secondary select-none">{name}</h3>
          <span className="text-secondary text-sm select-none">Miembro</span>
        </div>
        <img src="/images/examples/universe.jpg" className="w-full rounded-sm select-none object-cover aspect-[390/156]" alt={`imagen del team ${name}`} title={`imagen del team ${name}`} />
        <div className="data py-2 flex justify-between">
          <div className="data-1">
            <h5 className="m-0 text-secondary">Tables</h5>
            <p className="mt-1 mb-0 text-white">{projects.length}</p>
          </div>
          <div className="data-1">
            <h5 className="m-0 text-secondary">Users</h5>
            <p className="mt-1 mb-0 text-white">{user.length}</p>
          </div>
          <div className="data-1">
            <h5 className="m-0 text-secondary">Vault</h5>
            <p className="mt-1 mb-0 text-white">{vault.length}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
