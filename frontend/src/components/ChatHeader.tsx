import type { TypingInfo } from "../types/chat"

type Props = {
    totalUsers: number
    activeUsers: number
    isLoading: boolean
    typingIndicator: TypingInfo | null
}

const ChatHeader = ({ totalUsers = 0, activeUsers = 0, isLoading }: Props) => {
    return (
        <div className="w-full flex flex-row gap-3 items-center justify-between border-b-2 border-primary pb-4">
            <div className="space-y-2">
                <h1 className="text-xl font-medium">Kurakani Chat</h1>
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div className={`w-2 h-2 rounded-full bg-green-400/80 ${isLoading && "animate-pulse"}`}></div>
                        <p className={`text-xs font-extralight text-muted ${isLoading && "animate-pulse"}`}>{activeUsers} Active Now</p>
                    </div>
                    <p className={`text-xs font-extralight text-muted ${isLoading && "animate-pulse"}`}>{totalUsers} Members</p>
                </div>
            </div>
            <div>
                Some other settings
            </div>
        </div>
    )
}
export default ChatHeader