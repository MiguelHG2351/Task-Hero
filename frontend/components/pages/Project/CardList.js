import Card from "./Card";

export default function CardList({ refetch, table, tables, openModal, filters }) {
    console.log('reload')
    function openModalHandler() {
        openModal({
            show: true,
            tableId: table.id,
        });
    }

    return (
        <article>
            <header className="border-dark-secondary border-b-primary border-b-0.5 border-solid flex items-center justify-between">
                <h2 className="text-primary text-sm bg-primary p-2 rounded-md font-bold">
                    {table.name}{" "}
                    <span className="text-secondary">&#40;1&#41;</span>
                </h2>
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
            </header>
            <ul className="pl-0 flex flex-col gap-y-2">
                {table.cards.map((card, index) => {
                    if (filters[card.category]) {
                        const optionMove = tables.filter(
                            (option) => option.name !== table.name
                        );
                        return (
                            <Card
                                card={card}
                                tableOrigin={table.id}
                                optionMove={optionMove}
                                key={index + card.name}
                                refetch={refetch}
                            />
                        );
                    }
                })}
            </ul>
            <button
                onClick={openModalHandler}
                className="bg-transparent border-dashed border-secondary w-full py-3 text-secondary text-lg"
            >
                <svg
                    className="align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M12.6667 8.66667H8.66668V12.6667H7.33334V8.66667H3.33334V7.33333H7.33334V3.33333H8.66668V7.33333H12.6667V8.66667Z"
                        fill="#ACACAC"
                    />
                </svg>
                <span>New Board</span>
            </button>
        </article>
    );
}

