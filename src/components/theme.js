import ThemeService from '../services/theme.js';
import * as Renders from '../renders.js';

class Theme extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
      <div id="theme">
        <form id="themeForm">
          <label for="backgroundColor">Cor do fundo:</label><br>
          <input type="color" id="backgroundColor" name="backgroundColor" value="#ffffff"><br>
          <br>

          <label for="textColor">Cor do texto:</label><br>
          <select id="textColor" name="textColor">
            <option value="#000000">Escuro</option>
            <option value="#ffffff">Claro</option>
          </select><br>
          <br>

          <input type="submit" value="Salvar">
        </form> 
      </div>
    `;

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
    
    function submitThemeForm(event){
      event.preventDefault();

      const oldThemeData = ThemeService.getThemeData();
      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());

      ThemeService.setTextColor(dataObject.textColor);
      ThemeService.setBackgroundColor(dataObject.backgroundColor);
      ThemeService.updateDb();

      setTheme();

      if(JSON.stringify(oldThemeData) === '{}') {
        Renders.clearMainSection();
        Renders.renderCurrentDayTemplate();
      }
    }

    const themeForm = this.querySelector("#themeForm");
    themeForm.addEventListener("submit", submitThemeForm);
  }
}

customElements.define('theme-data', Theme);