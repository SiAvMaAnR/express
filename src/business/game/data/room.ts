import UserService from "../../../services/userService";
import GameData from "./gameData";
import Player from "./player";

class Room {
    private _id: string;
    private _players: Player[] = [];
    private _gameData: GameData;

    constructor(id: string, gameData: GameData) {
        this._id = id;
        this._gameData = gameData;
    }

    public get gameData(): GameData {
        return this._gameData;
    }

    public get count(): number {
        return this._players.length;
    }

    public get id(): string {
        return this._id;
    }

    public get players(): Player[] {
        return this._players;
    }

    public addPlayer(socketId: string): boolean {
        if (this.count >= 2 || this._gameData.isStart) {
            return false;
        }

        this._players.push(new Player(socketId));
        return true;
    }

    public getMyPlayer(socketId: string): Player {
        return this._players.find(player => player.socketId == socketId);
    }

    public getEnemyPlayer(socketId: string): Player {
        return this._players.find(player => player.socketId != socketId);
    }

    public removePlayer(sokcetId: string): boolean {
        this._players = this._players.filter(player => player.socketId != sokcetId);
        return true;
    }

    public isFullRoom(): boolean {
        return this.count >= 2;
    }

    public restart(): void {
        this._gameData.isEnd = false;
        this._gameData.isStart = false;
        this._players.forEach(player => player.restart());
    }
}

export default Room;