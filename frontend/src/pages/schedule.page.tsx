
import { Schedule } from "../components"
import { UsersTaskProvider } from "../hooks"
export const SchedulePage = () => {
    return (
        <div>
            <UsersTaskProvider>
                <Schedule />
            </UsersTaskProvider>
        </div>
    )
}

