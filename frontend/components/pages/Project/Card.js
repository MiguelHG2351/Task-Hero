import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { MOVE_CARD } from "app/apollo/projects";

export default function Card({ optionMove, card, tableOrigin, refetch }) {
    const menuRef = useRef();
    function openMenu() {
        menuRef.current.classList.toggle("hidden");
    }
    return (
        <li className="list-none select-none cursor-pointer bg-primary px-4 py-4 rounded-lg">
            <div className="item-title relative flex items-center gap-x-2  justify-between">
                <h3 className="text-primary m-0 w-[24ch] overflow-hidden text-ellipsis">
                    {card.name}
                </h3>
                <div
                    ref={menuRef}
                    className="absolute hidden right-0 top-6 bg-secondary"
                >
                    <ul className="list-none px-3 py-2 box-border">
                        {optionMove.map((option) => (
                            <OptionCard refetch={refetch} key={option.id + card.id + tableOrigin} tableOrigin={tableOrigin} option={option} card={card} />
                        ))}
                        <li className="text-secondary hover:bg-accent hover:text-black p-2 rounded-md">
                            Eliminar
                        </li>
                    </ul>
                </div>
                <div onClick={openMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                    >
                        <path
                            d="M4.99999 8.83333C4.08333 8.83333 3.33333 9.58333 3.33333 10.5C3.33333 11.4167 4.08333 12.1667 4.99999 12.1667C5.91666 12.1667 6.66666 11.4167 6.66666 10.5C6.66666 9.58333 5.91666 8.83333 4.99999 8.83333ZM15 8.83333C14.0833 8.83333 13.3333 9.58333 13.3333 10.5C13.3333 11.4167 14.0833 12.1667 15 12.1667C15.9167 12.1667 16.6667 11.4167 16.6667 10.5C16.6667 9.58333 15.9167 8.83333 15 8.83333ZM9.99999 8.83333C9.08333 8.83333 8.33333 9.58333 8.33333 10.5C8.33333 11.4167 9.08333 12.1667 9.99999 12.1667C10.9167 12.1667 11.6667 11.4167 11.6667 10.5C11.6667 9.58333 10.9167 8.83333 9.99999 8.83333Z"
                            className="fill-primary"
                        />
                    </svg>
                </div>
            </div>
            <div className="item-preview my-4">
                <span className="inline-flex items-center gap-x-2 mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M9.99999 9.08333C9.49166 9.08333 9.08332 9.49166 9.08332 10C9.08332 10.5083 9.49166 10.9167 9.99999 10.9167C10.5083 10.9167 10.9167 10.5083 10.9167 10C10.9167 9.49166 10.5083 9.08333 9.99999 9.08333ZM9.99999 1.66666C5.39999 1.66666 1.66666 5.4 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66666 9.99999 1.66666ZM11.825 11.825L4.99999 15L8.17499 8.175L15 5L11.825 11.825Z"
                            className="fill-secondary"
                        />
                    </svg>
                    <strong className="text-primary">3</strong>
                </span>
                <span className="inline-flex items-center gap-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M18.0527 6.60938C17.6145 5.56353 16.977 4.61293 16.1758 3.81055C15.3769 3.00678 14.428 2.36773 13.3828 1.92969C12.3121 1.47878 11.1617 1.24764 9.99999 1.25H9.96093C8.77929 1.25586 7.63671 1.49024 6.56054 1.95117C5.52435 2.3937 4.58431 3.03389 3.79296 3.83594C2.99946 4.63651 2.36927 5.58379 1.93749 6.625C1.48928 7.70774 1.26217 8.8692 1.26952 10.041C1.27538 11.3965 1.5996 12.7422 2.20507 13.9453V16.9141C2.20507 17.4102 2.60741 17.8125 3.10155 17.8125H6.0664C7.27513 18.4224 8.60899 18.7434 9.96288 18.75H10.0039C11.1719 18.75 12.3027 18.5234 13.3691 18.0801C14.409 17.6473 15.3544 17.0157 16.1523 16.2207C16.957 15.4219 17.5898 14.4883 18.0332 13.4473C18.4922 12.3691 18.7266 11.2227 18.7324 10.0391C18.7363 8.84961 18.5058 7.69531 18.0527 6.60938ZM6.10155 10.9375C5.58593 10.9375 5.16601 10.5176 5.16601 10C5.16601 9.48242 5.58593 9.0625 6.10155 9.0625C6.61718 9.0625 7.0371 9.48242 7.0371 10C7.0371 10.5176 6.61913 10.9375 6.10155 10.9375ZM9.99999 10.9375C9.48436 10.9375 9.06444 10.5176 9.06444 10C9.06444 9.48242 9.48436 9.0625 9.99999 9.0625C10.5156 9.0625 10.9355 9.48242 10.9355 10C10.9355 10.5176 10.5156 10.9375 9.99999 10.9375ZM13.8984 10.9375C13.3828 10.9375 12.9629 10.5176 12.9629 10C12.9629 9.48242 13.3828 9.0625 13.8984 9.0625C14.4141 9.0625 14.834 9.48242 14.834 10C14.834 10.5176 14.4141 10.9375 13.8984 10.9375Z"
                            className="fill-secondary"
                        />
                    </svg>
                    <strong className="text-primary">3</strong>
                </span>
            </div>
            <div className="description">
                <p className="text-sm leading-5 text-secondary w-[24ch] overflow-hidden text-ellipsis">
                    {card.description}
                </p>
            </div>
            <div className="item-tags">
                <span className="bg-cyan-600 inline-block py-2 px-4 rounded-md text-white">
                    {card.category}
                </span>
            </div>
        </li>
    );
}

function OptionCard({ tableOrigin, option, card, refetch }) {
    console.log(option, card, tableOrigin);
    const [mutateFunction, { data, loading, error }] = useMutation(MOVE_CARD, {
        onCompleted: () => {
            refetch();
        }
    });

    return (
        <li
            data-destination={option.id}
            key={option.id}
            data-origin={tableOrigin}
            data-card={card.id}
            onClick={() => {
                mutateFunction({
                    variables: {
                        data: {
                            tableIdOrigin: tableOrigin,
                            tableIdDestination: option.id,
                            cardId: card.id,
                        },
                    },
                });
            }}
            className="text-secondary hover:bg-accent hover:text-black p-2 rounded-md"
        >
            Mover a {option.name}
        </li>
    );
}
