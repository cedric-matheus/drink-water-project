/** Importando models (tipos) */
import * as UserModel from '../models/user.js';

/**
 * @typedef User
 * @type {UserModel.User}
 */

/**
 * Salva dados do usuário na base local
 * 
 * @param {User} userData Dados do usuário
 */
export function saveUser(userData) {
  const userDataString = JSON.stringify(userData);

  localStorage.setItem('user', userDataString);
}

/**
 * Lê dados do usuário na base local
 * 
 * @returns {User} Dados do usuário
 */
export function readUser() {
  const userDataString = localStorage.getItem('user');

  return JSON.parse(userDataString)
}