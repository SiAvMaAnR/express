import BaseRepository from "./baseRepository";
import { Statistic } from "../models";
import { Sequelize } from "sequelize-typescript";


class StatisticRepository extends BaseRepository<Statistic> {

    public constructor(sequelize: Sequelize) {
        super(sequelize.getRepository(Statistic));
    }
}

export default StatisticRepository;