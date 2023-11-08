import DayService from '../services/day.js';
import UserService from '../services/user.js';
import * as Renders from '../renders.js';


class CurrentDay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
      <div id="currentDay">
        <div>
          <h2 id="currentDayDate"></h2>
          <h3 id="currentDayTotalWater"></h3>
          <h3 id="currentDayDrunkWaterDifference"></h3>
          <h3 id="currentDayTotalDrunkWater"></h3>
        </div>
        <div>
          <form id="drinkWaterForm">
            <label for="totalWaterDrunk">Total de água bebida em ml:</label><br>
            <input type="number" id="totalWaterDrunk" name="totalWaterDrunk" value="300"><br>
            <br>

            <input type="submit" value="Beber">
          </form>
        </div> 
      </div>
    `;
    
    function submitDrinkWaterForm(event){
      event.preventDefault();

      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());

      DayService.drinkWater(parseInt(dataObject.totalWaterDrunk));
      
      Renders.refreshDayViewData(DayService.getCurrentDayData(), true);
    }

    function startNewDay() {
      const userData = UserService.getUserData();

      DayService.setTotalObjectiveWater(userData.totalWaterRange)

      Renders.refreshDayViewData(DayService.getCurrentDayData(), true);
    }

    const drinkWaterForm = this.querySelector("#drinkWaterForm");
    drinkWaterForm.addEventListener("submit", submitDrinkWaterForm);

    const currentDayData = DayService.getCurrentDayData();

    if(currentDayData.totalObjectiveWater === undefined)
      startNewDay();
  }
}

customElements.define('current-day', CurrentDay);