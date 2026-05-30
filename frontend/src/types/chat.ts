export type Sender = {
  _id: string;
  username: string;
};

export type Reactions = {
  type: "like" | "love" | "haha" | "sad" | "angry" | "none";
  reacted_by: Sender;
};

export type MessageObj = {
  _id: string;
  message: string;
  sender: Sender;
  imageUrl: string | null;
  reactions: Reactions;
  createdAt: Date
  updatedAt: Date
};

export type TypingInfo = {
  state:boolean
  username:string
}