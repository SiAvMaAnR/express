import { Namespace, Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class SocketTool {

    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    private socket: Socket


    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket) {
        this.io = io;
        this.socket = socket;
    }


    public getCountInRoom(roomId: string): number {
        return this.io.sockets.adapter.rooms.get(roomId)?.size || 0;
    }

    public getRooms(): Map<string, Set<string>> {
        return this.io.sockets.adapter.rooms;
    }

    public getSocketsInRoom(roomId: string): Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
        return this.io.sockets.adapter.rooms[roomId].sockets;
    }


}


export default SocketTool;