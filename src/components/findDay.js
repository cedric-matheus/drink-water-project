import DayService from '../services/day.js';
import * as Renders from '../renders.js';


class FindDay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
      <div id="findDay">
        <div>
          <h2 id="findDayDate"></h2>
          <h3 id="findDayTotalWater"></h3>
          <h3 id="findDayDrunkWaterDifference"></h3>
          <h3 id="findDayTotalDrunkWater"></h3>
        </div>
        <div>
          <form id="findDayForm">
            <label for="dayDate">Total de água bebida em ml:</label><br>
            <input type="date" id="dayDate" name="dayDate" value="2023-11-07"><br>
            <br>

            <input type="submit" value="Buscar">
          </form>
        </div> 
      </div>
    `;
    
    function submitFindDayForm(event){
      event.preventDefault();

      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());
      const dayDateString = DayService.getDateString(dataObject.dayDate);

      const dayData = DayService.getDayData(dayDateString);

      Renders.refreshDayViewData(dayData);
    }

    const findDayForm = this.querySelector("#findDayForm");
    findDayForm.addEventListener("submit", submitFindDayForm);
  }
}

customElements.define('find-day', FindDay);