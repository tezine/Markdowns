#region Imports
using System;
using System.Collections.Generic;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
#endregion

namespace POCSelenium {
    public class PageLogin {

        #region Fields
        private SeleniumConfig seleniumConfig;
        private IWebDriver webDriver;
        #endregion

        #region Constructor
        public PageLogin(SeleniumConfig seleniumConfigurations) {
            seleniumConfig = seleniumConfigurations;
            ChromeOptions optionsFF = new ChromeOptions();
            //uncomment this line if you don't want to see Chrome executing the RPA. 
            //optionsFF.AddArgument("--headless");
            //Use the Selenium.WebDriver.ChromeDriver nuget  with exact same version you have in your chrome browser. Check the version by typing chrome://version/
            webDriver = new ChromeDriver("./", optionsFF);
        }
        #endregion

        #region LoadPage
        public void LoadPage() {
            webDriver.Manage().Timeouts().PageLoad =TimeSpan.FromSeconds(60);
            webDriver.Navigate().GoToUrl(seleniumConfig.UrlPageLogin);
        }
        #endregion

        #region DoLogin
        public bool DoLogin() {
            Thread.Sleep(4000);
            var txtEmail = webDriver.FindElement(By.Id("txtEmail"));
            var txtPassword = webDriver.FindElement(By.Id("txtPassword"));
            var btnLogin = webDriver.FindElement(By.TagName("button"));
            
            txtEmail.SendKeys("bruno@tezine.com");
            txtPassword.SendKeys("tata");

            Thread.Sleep(4000);
            btnLogin.Click();

            WebDriverWait wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(30));
            //right click on the element to check it's xpath and paste it here. 
            wait.Until(ExpectedConditions.ElementExists(By.XPath("//*[@id=\"app\"]/div/main/div/div/div[1]/aside/div[1]/div[2]/div[1]/div[2]/div")));
            Thread.Sleep(2000);
            var menuItemUsers= webDriver.FindElement(By.XPath("//*[@id=\"app\"]/div/main/div/div/div[1]/aside/div[1]/div[2]/div[1]/div[2]/div"));

            menuItemUsers.Click();
            return true;
            
        } 
        #endregion


        public void Fechar() {
            webDriver.Quit();
            webDriver = null;
        }
    }
}