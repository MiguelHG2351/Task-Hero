import Header from "../Header"

export default function UserLayout({children}) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}