/** Importando models (tipos) */
import * as ThemeModel from '../models/theme.js';

/**
 * @typedef Theme
 * @type {ThemeModel.Theme}
 */

/**
 * Salva dados do tema na base local
 * 
 * @param {Theme} themeData Dados do tema
 */
export function saveTheme(themeData) {
  const themeDataString = JSON.stringify(themeData);

  localStorage.setItem('theme', themeDataString);
}

/**
 * Lê dados do tema na base local
 * 
 * @returns {Theme} Dados do tema
 */
export function readTheme() {
  const themeDataString = localStorage.getItem('theme');

  return JSON.parse(themeDataString)
}