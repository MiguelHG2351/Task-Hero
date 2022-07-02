import Header from "../../Header"

export default function AuthLayout({children}) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}