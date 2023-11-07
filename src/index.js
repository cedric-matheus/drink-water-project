import UserService from './services/user.js';
import ThemeService from './services/theme.js';

const userDataView = document.getElementById("userData");
const themeView = document.getElementById("theme");

const userForm = document.getElementById("userDataForm");
const themeForm = document.getElementById("themeForm");

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

function hiddenViews() {
  userDataView.style.display = "none";
  themeView.style.display = "none";
}

function refreshViews() {
  hiddenViews();

  if(JSON.stringify(UserService.getUserData()) === "{}")
    userDataView.style.display = "block";
  else if(JSON.stringify(ThemeService.getThemeData()) === "{}")
    themeView.style.display = "block";
  else {
    setTheme();
  }
}

function submitUserForm(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  UserService.setUserWeight(dataObject.userWeight);
  UserService.setUserDailyPhysicalActivity(dataObject.userDailyPhysicalActivity);
  UserService.calculateTotalWaterRange();

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

userForm.addEventListener("submit", submitUserForm);
themeForm.addEventListener("submit", submitThemeForm);

refreshViews();

