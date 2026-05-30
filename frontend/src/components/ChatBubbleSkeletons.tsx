const ChatBubbleOthersSkeleton = () => {
    return <div className="w-full max-w-2/3 h-20 bg-gray-600/50 rounded-tl-none rounded-2xl p-2 mt-4"></div>
}

const ChatBubbleSelfSkeleton = () => {
    return <div className="w-full max-w-2/3 h-20 self-end bg-gray-600/50 rounded-tl-none rounded-2xl p-2 mt-4"></div>

}

export { ChatBubbleOthersSkeleton, ChatBubbleSelfSkeleton }