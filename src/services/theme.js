import * as ThemeDb from "../db/theme.js";

class ThemeService {
  /**
   * @type {ThemeDb.Theme}
   */
  #themeData;
  

  /**
   * Criando serviço de tema
   */
  constructor() {
    const localThemeData = ThemeDb.readTheme();

    if(localThemeData)
      this.#themeData = {...localThemeData};
    else
      console.error('Não existem dados do tema.')
  };

  /**
   * Atualiza a base de dados
   */
  updateDb() {
    ThemeDb.saveTheme(this.#themeData);
  }

  /**
   * Define uma cor de fundo
   * 
   * @param {string} themeBackgroundColor Cor de fundo do tema (#ffffff)
   */
  setBackgroundColor(themeBackgroundColor) {
    const newThemeData = {...this.#themeData, backgroundColor: themeBackgroundColor}

    this.#themeData = newThemeData;
  };

    /**
   * Define uma cor de texto
   * 
   * @param {string} themeTextColor Cor de fundo do tema (#000000)
   */
    setTextColor(themeTextColor) {
      const newThemeData = {...this.#themeData, textColor: themeTextColor}
  
      this.#themeData = newThemeData;
    };

  /**
   * Retorna dados do tema
   */
  getThemeData() {
    return {...this.#themeData};
  };
};

const service = new ThemeService();

export default service;