import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar"

const RootLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
