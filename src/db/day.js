/** Importando models (tipos) */
import * as DayModel from '../models/day.js';

/**
 * @typedef Day
 * @type {DayModel.Day}
 */

/**
 * Salva dados do dia na base local
 * 
 * @param {Day} dayData Dados do dia
 */
export function saveDay(dayData) {
  const dayDataString = JSON.stringify(dayData);

  localStorage.setItem(dayData.date, dayDataString);
}

/**
 * Lê dados do dia na base local
 * 
 * @param {string} dayDate Data do dia
 * @returns {Day} Dia localizado
 */
export function readDay(dayDate) {
   const dayDataString = localStorage.getItem(dayDate);

   return JSON.parse(dayDataString);
}