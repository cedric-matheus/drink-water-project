import UserService from './services/user.js';
import ThemeService from './services/theme.js';

import * as Templates from './renders.js';

function startApp() {
  const userData = UserService.getUserData();
  const themeData = ThemeService.getThemeData();

  Templates.renderFooterMenu();

  if(userData.totalWaterRange === undefined)
    Templates.renderUserDataTemplate();
  else if (JSON.stringify(themeData) === '{}')
    Templates.renderThemeTemplate();
  else
    Templates.renderCurrentDayTemplate();
}

startApp();