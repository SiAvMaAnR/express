import IGameService from "./interfaces/IGameService";
import PlayersResponse from "../business/game/types/PlayersResponse";
import RoomResponse from "../business/game/types/RoomResponse";
import IGame from "../business/game/interfaces/IGame";
import { Statistic } from "../models";
import { IStatisticRes } from "../business/game/data/statistic";
import { Coordinate } from "../business/game/fields/field";
import BaseService, { IJwtUser } from "./baseService";

class GameService extends BaseService implements IGameService {

    private socketId: string;
    private game: IGame;

    constructor(socketId: string, game: IGame) {
        super();
        this.socketId = socketId;
        this.game = game;
    }

    public joinRoom(roomId: string): boolean {
        if (!this.game.isExistsRoom(roomId)) {
            this.game.createRoom(roomId);
        }

        return this.game.joinRoom(roomId, this.socketId);
    }

    public leaveRoom(): void {
        this.game.leaveRoom(this.socketId);
        this.game.removeEmptyRooms();
    }

    public getRooms(): RoomResponse[] {
        return this.game.getRooms().map((room, index) => {
            return {
                index: index,
                id: room.id,
                count: room.count
            }
        });
    }

    public getRoomById(roomId: string): RoomResponse {
        const room = this.game.getRoomById(roomId);

        if (!room) {
            return null;
        }

        return {
            id: room.id,
            count: room.count
        }
    }

    public getRoomByPlayer(): RoomResponse {
        const room = this.game.getRoomByPlayer(this.socketId);

        if (!room) {
            return null;
        }

        return {
            id: room.id,
            count: room.count
        }
    }

    public getPlayers(): PlayersResponse {
        const players = this.game.getPlayers(this.socketId);
        return {
            my: {
                socket: players?.my?.socketId,
                init: players?.my?.isInit,
                ready: players?.my?.isReady
            },
            enemy: {
                socket: players?.enemy?.socketId,
                init: players?.enemy?.isInit,
                ready: players?.enemy?.isReady
            }
        }
    }

    public isFullRoom(): boolean {
        return this.game.isFullRoom(this.socketId);
    }

    public getMyField(): number[][] {
        return this.game.getMyField(this.socketId)?.getArr();
    }

    public getEnemyField(): number[][] {
        return this.game.getEnemyField(this.socketId)?.getArr();
    }

    public initMyField(field: number[][]): number[][] {
        return this.game.getMyField(this.socketId)?.setField(field);
    }

    public getIsMove(): boolean {
        return this.game.getIsMove(this.socketId);
    }

    public moveGen(condition: boolean): boolean {
        const players = this.game.getPlayers(this.socketId);
        const myMove = players?.my?.setIsMove(condition);
        const enemyMove = players?.enemy?.setIsMove(!condition);
        return myMove != enemyMove;
    }

    public checkWin(): boolean {
        return this.game.checkWin(this.socketId);
    }

    public shoot(coordinate: Coordinate): boolean {
        return this.game.shoot(this.socketId, coordinate);
    }

    public setIsStart(isStart: boolean): void {
        return this.game.getRoomByPlayer(this.socketId).states.setIsStart(isStart);
    }

    public isEnd(): boolean {
        return this.game.getRoomByPlayer(this.socketId)?.states.isEnd;
    }

    public setIsEnd(isEnd: boolean): void {
        this.game.getRoomByPlayer(this.socketId).states.setIsEnd(isEnd);
    }

    public setIsReady(ready: boolean): void {
        this.game.setIsReady(this.socketId, ready);
    }

    public setIsInit(init: boolean): void {
        this.game.setIsInit(this.socketId, init);
    }

    public setIsAccess(access: boolean): void {
        this.game.setIsAccess(this.socketId, access);
    }

    public getStatistic(): IStatisticRes {
        return this.game.getStatistic(this.socketId);
    }

    public saveResult(isWon: boolean): void {
        this.game.saveResult(this.socketId, isWon);
    }
}


export default GameService;