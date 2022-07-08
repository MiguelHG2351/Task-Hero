import { useRouter } from "next/router";

export default function LayoutListTeam({ name, projects=[] }) {
    const router = useRouter()

  return (
    <section className="team-item py-4 px-2 box-border gap-x-3 gap-y-3 flex items-center justify-between bg-accent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 6.96665L9.375 9.85832V17.5H9.325L3.33333 14.675C3.08808 14.5653 2.87931 14.3878 2.73166 14.1634C2.584 13.9389 2.50362 13.6769 2.5 13.4083V6.96665ZM10.625 17.5V9.85832L17.5 6.96665V13.4167C17.4948 13.6839 17.4137 13.9441 17.2661 14.1669C17.1186 14.3897 16.9106 14.5659 16.6667 14.675L10.6667 17.5H10.625Z"
          fill="#3D3C3F"
        />
        <path
          d="M10 8.74999L17.0917 5.77499C16.9723 5.64239 16.8279 5.53476 16.6667 5.45832L10.6667 2.64999C10.4583 2.55135 10.2306 2.50018 10 2.50018C9.76943 2.50018 9.54174 2.55135 9.33333 2.64999L3.33333 5.45832C3.17213 5.53476 3.02768 5.64239 2.90833 5.77499L10 8.74999Z"
          fill="#3D3C3F"
        />
      </svg>
      <h2 className="m-0 text-dark-primary text-sm md:whitespace-nowrap select-none">
        Proyecto: {name}
      </h2>
      <div className="option">
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          className="align-middle"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.00004 8.83334C4.08337 8.83334 3.33337 9.58334 3.33337 10.5C3.33337 11.4167 4.08337 12.1667 5.00004 12.1667C5.91671 12.1667 6.66671 11.4167 6.66671 10.5C6.66671 9.58334 5.91671 8.83334 5.00004 8.83334ZM15 8.83334C14.0834 8.83334 13.3334 9.58334 13.3334 10.5C13.3334 11.4167 14.0834 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58334 15.9167 8.83334 15 8.83334ZM10 8.83334C9.08337 8.83334 8.33337 9.58334 8.33337 10.5C8.33337 11.4167 9.08337 12.1667 10 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58334 10.9167 8.83334 10 8.83334Z"
            className="fill-dark-primary"
          />
        </svg>
      </div>
    </section>
  );
}
