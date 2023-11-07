import * as UserDb from "../db/user.js";

class UserService {
  /**
   * @type {UserDb.User}
   */
  #userData;
  

  /**
   * Criando serviço de usuário
   */
  constructor() {
    const localUserData = UserDb.readUser();

    if(localUserData)
      this.#userData = {...localUserData};
    else
      console.error('Não existem dados do usuário.')
  };

  /**
   * Atualiza a base de dados
   */
  #updateDb() {
    UserDb.saveUser(this.#userData);
  }

  /**
   * Define um peso para o usuário
   * 
   * @param {number} userWeight Peso do usuário em kg
   */
  setUserWeight(userWeight) {
    const newUserData = {...this.#userData, weight: userWeight}

    this.#userData = newUserData;

    this.#updateDb();
  };

  /**
   * Define um nível de atividade física para o usuário
   * 
   * @param {number} userDailyPhysicalActivity Nível de atividade física diária (0=baixa, 1=moderada e 2=alta)
   */
  setUserDailyPhysicalActivity(userDailyPhysicalActivity) {
    const newUserData = {...this.#userData, dailyPhysicalActivity: userDailyPhysicalActivity}

    this.#userData = newUserData;

    this.#updateDb();
  };

  /**
   * Calcula faixa total de ingestão diária de água
   */
  calculateTotalWaterRange() {
    const minWaterRanges = [25, 33, 41]
    const maxWaterRanges = [33, 41, 50]

    const userTotalMinWater = this.#userData.weight * minWaterRanges[this.#userData.dailyPhysicalActivity];
    const userTotalMaxWater = this.#userData.weight * maxWaterRanges[this.#userData.dailyPhysicalActivity];
    const userTotalWaterRange = [userTotalMinWater, userTotalMaxWater];

    const newUserData = {...this.#userData, totalWaterRange: userTotalWaterRange}

    this.#userData = newUserData;

    this.#updateDb();
  };

  /**
   * Retorna dados do usuário
   */
  getUserData() {
    return {...this.#userData};
  };
};

const service = new UserService();

export default service;