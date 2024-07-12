export default class Alert {
    constructor(alertsUrl) {
      this.alertsUrl = alertsUrl;
      this.loadAlerts();
    }
  
    async loadAlerts() {
      try {
        const response = await fetch(this.alertsUrl);
        const alerts = await response.json();
        this.createAlertList(alerts);
      } catch (error) {
        console.error("Error loading alerts:", error);
      }
    }
  
    createAlertList(alerts) {
      if (!alerts || alerts.length === 0) {
        return;
      }
  
      const alertList = document.createElement("section");
      alertList.className = "alert-list";
  
      alerts.forEach(alert => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertList.appendChild(alertElement);
      });
  
      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(alertList);
      } else {
        console.error("Main element not found");
      }
    }
  }