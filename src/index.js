import UserService from './services/user.js';
import ThemeService from './services/theme.js';
import DayService from './services/day.js';

const userDataView = document.getElementById("userData");
const themeView = document.getElementById("theme");
const currentDayView = document.getElementById("currentDay");
const findDayView = document.getElementById("findDay");

const userForm = document.getElementById("userDataForm");
const themeForm = document.getElementById("themeForm");
const drinkWaterForm = document.getElementById("drinkWaterForm");
const findDayForm = document.getElementById("findDayForm");

const findDayLink = document.getElementById("findDayLink");
const themeLink = document.getElementById("themeLink");
const userDataLink = document.getElementById("userDataLink");
const currentDayLink = document.getElementById("currentDayLink");

function setTheme() {
  const themeData = ThemeService.getThemeData();

  const rootElement = document.querySelector(':root');
  const computedStyle = getComputedStyle(rootElement);

  rootElement.style.setProperty('--textColor', themeData.textColor);
  rootElement.style.setProperty('--backgroundColor', themeData.backgroundColor);

  if(themeData.textColor === '#000000') {
    rootElement.style.setProperty('--a1BgColor', computedStyle.getPropertyValue("--darkA1BgColor"));
    rootElement.style.setProperty('--a3BgColor', computedStyle.getPropertyValue("--darkA3BgColor"));
  } else {
    rootElement.style.setProperty('--a1BgColor', computedStyle.getPropertyValue("--lightA1BgColor"));
    rootElement.style.setProperty('--a3BgColor', computedStyle.getPropertyValue("--lightA3BgColor"));
  }
}

function refreshDayViewData(dayData, current) {
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

function refreshCurrentDayViewData() {
  const currentDayData = DayService.getCurrentDayData();

  refreshDayViewData(currentDayData, true);
}

function hiddenViews() {
  userDataView.style.display = "none";
  themeView.style.display = "none";
  currentDayView.style.display = "none";
  findDayView.style.display = "none";
}

function refreshViews() {
  hiddenViews();

  if(JSON.stringify(UserService.getUserData()) === "{}")
    userDataView.style.display = "block";
  else if(JSON.stringify(ThemeService.getThemeData()) === "{}")
    themeView.style.display = "block";
  else {
    setTheme();
    refreshCurrentDayViewData();
    currentDayView.style.display = "block"
  }
}

function startNewDay() {
  const userData = UserService.getUserData();
  DayService.setTotalObjectiveWater(userData.totalWaterRange)
}

function startApp() {
  const userData = UserService.getUserData();
  const currentDayData = DayService.getCurrentDayData();

  if(userData.totalWaterRange !== undefined && currentDayData.totalObjectiveWater === undefined)
    startNewDay();
}

function submitUserForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  UserService.setUserWeight(dataObject.userWeight);
  UserService.setUserDailyPhysicalActivity(dataObject.userDailyPhysicalActivity);
  UserService.calculateTotalWaterRange();

  startNewDay();
  refreshViews();
}

function submitThemeForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  ThemeService.setTextColor(dataObject.textColor);
  ThemeService.setBackgroundColor(dataObject.backgroundColor);
  ThemeService.updateDb();

  setTheme();

  refreshViews();
}

function submitFindDayForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  const dayDateString = DayService.getDateString(dataObject.dayDate);

  const dayData = DayService.getDayData(dayDateString);

  refreshDayViewData(dayData);
}

function submitDrinkWaterForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  DayService.drinkWater(parseInt(dataObject.totalWaterDrunk));

  refreshViews();
}

function findDayLinkClick(event){
  event.preventDefault();
  
  hiddenViews();

  findDayView.style.display = "block";
}

function themeLinkClick(event){
  event.preventDefault();
  
  hiddenViews();

  themeView.style.display = "block";
}

function userDataLinkClick(event){
  event.preventDefault();
  
  hiddenViews();

  userDataView.style.display = "block";
}

function currentDayLinkClick(event){
  event.preventDefault();
  
  hiddenViews();

  refreshCurrentDayViewData();
  currentDayView.style.display = "block";
}

userForm.addEventListener("submit", submitUserForm);
themeForm.addEventListener("submit", submitThemeForm);
drinkWaterForm.addEventListener("submit", submitDrinkWaterForm);
findDayForm.addEventListener("submit", submitFindDayForm);

findDayLink.addEventListener("click", findDayLinkClick);
themeLink.addEventListener("click", themeLinkClick);
userDataLink.addEventListener("click", userDataLinkClick);
currentDayLink.addEventListener("click", currentDayLinkClick);

startApp();
refreshViews();