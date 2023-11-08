import './components/userData.js';
import './components/currentDay.js';
import './components/theme.js';
import './components/findDay.js';

const menuTemplate = document.getElementById("menuTemplate");
const footerMenuTemplateContent = menuTemplate.content;

const mainSection = document.getElementById("mainSection");
const footerSection = document.getElementById("footerSection");

export function renderFooterMenu() {
  footerSection.appendChild(footerMenuTemplateContent);
}

export function renderUserDataTemplate() {
  const userDataElement = document.createElement('user-data');
  mainSection.appendChild(userDataElement);
}

export function renderCurrentDayTemplate() {
  const currentDayElement = document.createElement('current-day');
  mainSection.appendChild(currentDayElement);
}

export function renderFindDayTemplate() {
  const findDayElement = document.createElement('find-day');
  mainSection.appendChild(findDayElement);
}

export function renderThemeTemplate() {
  const themeElement = document.createElement('theme-data');
  mainSection.appendChild(themeElement);
}

export function clearMainSection() {
  mainSection.innerHTML = '';
}

export function refreshDayViewData(dayData, current) {
  const dateElement = document.getElementById((current ? "current" : "find") + "DayDate");
  const totalWaterElement = document.getElementById((current ? "current" : "find") + "DayTotalWater");
  const drunkWaterDifferenceElement = document.getElementById((current ? "current" : "find") + "DayDrunkWaterDifference");
  const totalDrunkWaterElement = document.getElementById((current ? "current" : "find") + "DayTotalDrunkWater");

  const totalWaterText = dayData ? `Total de água no dia: ${dayData.totalObjectiveWater[0]}ml a ${dayData.totalObjectiveWater[1]}ml` : '';
  const drunkWaterDifferenceText = dayData ? `Total de água restante: ${dayData.waterDrunkDifference[0]}ml a ${dayData.waterDrunkDifference[1]}ml` : '';
  const totalDrunkWaterText = dayData? `Total de água ingerido: ${dayData.totalWaterDrunk}ml` : '';

  dateElement.innerText = dayData?.date || '';
  totalWaterElement.innerText = totalWaterText;
  drunkWaterDifferenceElement.innerText = drunkWaterDifferenceText;
  totalDrunkWaterElement.innerText = totalDrunkWaterText;
}