import * as DayDb from "../db/day.js";

class DayService {
  /**
   * @type {DayDb.Day}
   */
  #dayData;
  

  /**
   * Criando serviço de dia
   */
  constructor() {
    const currentDate = new Date();
    const currentDayIsoString = currentDate.toISOString().split('T');
    const currentDateString = this.getDateString(currentDayIsoString[0]);

    const localDayData = DayDb.readDay(currentDateString);

    if(localDayData)
      this.#dayData = {...localDayData};
    else {
      /** @type {DayDb.Day} */
      const newDayData = {
        date: currentDateString,
        totalObjectiveWater: undefined,
        totalWaterDrunk: undefined,
        waterDrunkDifference: undefined,
      };

      this.#dayData = {...newDayData};

      this.#updateDb();
    }
  };

  /**
   * Atualiza a base de dados
   */
  #updateDb() {
    DayDb.saveDay(this.#dayData);
  }

  /**
   * Define um objetivo de água diário
   * 
   * @param {number[]} userTotalWaterRange Total diário de água do usuário 
   */
  setTotalObjectiveWater(userTotalWaterRange) {
    const newDayData = {
      ...this.#dayData,
      totalWaterDrunk: 0,
      totalObjectiveWater: userTotalWaterRange,
      waterDrunkDifference: userTotalWaterRange,
    }

    this.#dayData = {...newDayData};

    this.#updateDb();
  };

  /**
   * Adiciona uma quantidade de água ao total bebido
   * 
   * @param {number} waterDrunk Quantidade de água ingerida
   */
  drinkWater(waterDrunk) {
    const newTotalWaterDrunk = this.#dayData.totalWaterDrunk + waterDrunk; 

    const newMinWaterDrunkDifference = this.#dayData.waterDrunkDifference[0] - waterDrunk;
    const newMaxWaterDrunkDifference = this.#dayData.waterDrunkDifference[1] - waterDrunk;
    const newWaterDrunkDifference = [newMinWaterDrunkDifference, newMaxWaterDrunkDifference];

    const newDayData = {
      ...this.#dayData,
      totalWaterDrunk: newTotalWaterDrunk,
      waterDrunkDifference: newWaterDrunkDifference
    }

    this.#dayData = newDayData;

    this.#updateDb();
  };

  /**
   * Retorna dados de um dia específico
   * @param {string} dayDate Data do dia (dd/mm/aaaa)
   * @returns {DayDb.Day} Dados do dia informado
   */
  getDayData(dayDate) {
    return DayDb.readDay(dayDate);
  };

  /**
   * Retorna dados do dia atual
   */
  getCurrentDayData() {
    return {...this.#dayData};
  };

  /**
   * Retorna uma string de data válida a partir de uma ISO
   * @param {string} IsoString ISO Date String
   */
  getDateString(IsoString) {
    const dayDateIsoString = IsoString.split('-');
    const dayDateString = `${dayDateIsoString[2]}/${dayDateIsoString[1]}/${dayDateIsoString[0]}`;

    return dayDateString
  }
};

const service = new DayService();

export default service;