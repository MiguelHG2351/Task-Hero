import Link from "next/link";

export default function HomeListProject({name, description}) {
  return (
    <Link href="/u">
      <a>
        <h2>{name}</h2>
        <p>{description}</p>
      </a>
    </Link>
  );
}
