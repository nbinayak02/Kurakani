const MessageBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-120 flex flex-col gap-4 overflow-y-auto">
            {children}
        </div>
    );
}
export default MessageBox;