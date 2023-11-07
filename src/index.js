import UserService from './services/user.js';

const userDataView = document.getElementById("userData");

function hiddenViews() {
  userDataView.style.display = "none";
}

function refreshViews() {
  hiddenViews();

  if(JSON.stringify(UserService.getUserData()) === "{}")
    userDataView.style.display = "block";
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

const userForm = document.getElementById("userDataForm");
userForm.addEventListener("submit", submitUserForm);

refreshViews();

