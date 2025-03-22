import { SidebarProvider } from "../components/ui/sidebar"
import { SideBar } from "../components/sidebar.component"
import { ReactNode } from "react"

interface LayoutWebProps {
    children: ReactNode
}

export const LayoutWeb = ({ children }: LayoutWebProps) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">

                <main className="flex-1 p-4">
                    {children}
                </main>
                
                <div className="fixed right-0 top-0 h-full">
                    <SideBar />
                </div>
            </div>
        </SidebarProvider>
    )
}
