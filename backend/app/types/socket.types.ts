import type { Types } from "mongoose"

export type SendMessagePayload = {
    senderId: Types.ObjectId;
    message: string
}

export type TypingPayload = {
    isTyping: boolean
    by: string
}