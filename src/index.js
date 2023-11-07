import UserService from './services/user.js';
import ThemeService from './services/theme.js';
import DayService from './services/day.js';

const userDataView = document.getElementById("userData");
const themeView = document.getElementById("theme");
const currentDayView = document.getElementById("currentDay");

const userForm = document.getElementById("userDataForm");
const themeForm = document.getElementById("themeForm");
const drinkWaterForm = document.getElementById("drinkWaterForm");

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

function refreshCurrentDayViewData() {
  const currentDayData = DayService.getCurrentDayData();

  const dateElement = document.getElementById("currentDayDate");
  const totalWaterElement = document.getElementById("currentDayTotalWater");
  const drunkWaterDifferenceElement = document.getElementById("currentDayDrunkWaterDifference");
  const totalDrunkWaterElement = document.getElementById("currentDayTotalDrunkWater");

  const totalWaterText = `Total de água no dia: ${currentDayData.totalObjectiveWater[0]}ml a ${currentDayData.totalObjectiveWater[1]}ml`;
  const drunkWaterDifferenceText = `Total de água restante: ${currentDayData.waterDrunkDifference[0]}ml a ${currentDayData.waterDrunkDifference[1]}ml`;
  const totalDrunkWaterText = `Total de água ingerido: ${currentDayData.totalWaterDrunk}ml`;

  dateElement.innerText = currentDayData.date;
  totalWaterElement.innerText = totalWaterText;
  drunkWaterDifferenceElement.innerText = drunkWaterDifferenceText;
  totalDrunkWaterElement.innerText = totalDrunkWaterText;
}

function hiddenViews() {
  userDataView.style.display = "none";
  themeView.style.display = "none";
  currentDayView.style.display = "none";
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

function submitDrinkWaterForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  DayService.drinkWater(parseInt(dataObject.totalWaterDrunk));

  refreshViews();
}

userForm.addEventListener("submit", submitUserForm);
themeForm.addEventListener("submit", submitThemeForm);
drinkWaterForm.addEventListener("submit", submitDrinkWaterForm);

startApp();
refreshViews();