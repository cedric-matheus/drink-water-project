import UserService from '../services/user.js';
import * as Renders from '../renders.js';

class UserData extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
      <div id="userData">
        <form id="userDataForm">
          <label for="userWeight">Peso em Kg:</label><br>
          <input type="number" id="userWeight" name="userWeight" value="70.00" step="0.01"><br>
          <br>

          <label for="userDailyPhysicalActivity">Nível de atividade física diária:</label><br>
          <select id="userDailyPhysicalActivity" name="userDailyPhysicalActivity">
            <option value="0">Baixo</option>
            <option value="1">Moderado</option>
            <option value="2">Alto</option>
          </select><br>
          <br>

          <input type="submit" value="Salvar">
        </form> 
      </div>
    `;
    
    function submitUserForm(event){
      event.preventDefault();

      const oldUserData = UserService.getUserData();
      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());

      UserService.setUserWeight(dataObject.userWeight);
      UserService.setUserDailyPhysicalActivity(dataObject.userDailyPhysicalActivity);
      UserService.calculateTotalWaterRange();

      if(oldUserData.totalWaterRange === undefined) {
        Renders.clearMainSection();
        Renders.renderThemeTemplate();
      }
    }

    const userForm = this.querySelector("#userDataForm");
    userForm.addEventListener("submit", submitUserForm);
  }
}

customElements.define('user-data', UserData);