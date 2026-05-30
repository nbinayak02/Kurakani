import type { Socket, Server} from "socket.io";
import { decrementActiveUsers, incrementActiveUsers } from "../../middlewares/activeUsers.js";

export const emitIncrementedActiveUsers = async ( io: Server) => {
    try {
        const activeUsers = await incrementActiveUsers();
        io.to("default").emit("activeUserCount", activeUsers);
    } catch (error) {
        console.log(error);
    }
}

export const emitDecrementedActiveUsers = async(io:Server) => {
    try {
        const activeUsers = await decrementActiveUsers();
        io.to("default").emit("activeUserCount", activeUsers);
    } catch (error) {
        console.log(error)
    }
}