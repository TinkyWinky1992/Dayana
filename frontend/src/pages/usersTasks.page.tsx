import { UsersCard } from "../components"
import { UsersTaskProvider } from "../hooks"

export const UsersTasks = () => {

    return (
        <div >
            <UsersTaskProvider>
                <UsersCard/>
            </UsersTaskProvider>
        </div>
    )
}

