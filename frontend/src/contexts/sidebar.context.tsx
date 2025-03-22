import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { SideBar } from "../components"
import { Outlet } from "react-router-dom"
 
export default function SidebarContext() {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}