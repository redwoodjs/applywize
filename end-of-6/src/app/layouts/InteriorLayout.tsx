import { Header } from "../components/Header"

const InteriorLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="page-wrapper">
      <main className="page bg-white">
        <Header />
        {children}
      </main>
    </div>
  )
}

export { InteriorLayout }