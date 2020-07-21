using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Threading;

namespace Google {
    public class Maps {

        #region Fields
        private IWebDriver webDriver;
        public string PlaceType { get; set; }
        public List<string> PlacesList { get; private set;}= new List<string>();
        #endregion

        #region Constructor
        public Maps() {
            ChromeOptions optionsFF = new ChromeOptions();
            //uncomment this line if you don't want to see Chrome executing the RPA. 
            //optionsFF.AddArgument("--headless");
            //Use the Selenium.WebDriver.ChromeDriver nuget  with exact same version you have in your chrome browser. Check the version by typing chrome://version/
            var chromeDriverDir = Directory.GetCurrentDirectory().Replace("\\PoCSpecflow\\TestResults","");
            chromeDriverDir += "/Google/bin/Debug/netstandard2.0";
            webDriver = new ChromeDriver(chromeDriverDir, optionsFF);
        }
        #endregion

        #region Search
        public void Search() {
            try {
                webDriver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(60);
                webDriver.Navigate().GoToUrl("https://www.google.com/maps/search/" + PlaceType);
                WebDriverWait wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(60));
                wait.Until(ExpectedConditions.ElementExists(By.CssSelector("h3.section-result-title>span")));
                ReadOnlyCollection<IWebElement> elements = webDriver.FindElements(By.CssSelector($"h3.section-result-title>span"));
                foreach(IWebElement webElement in elements){
                    var placeName = webElement.Text;
                    PlacesList.Add(placeName);
                }
            } catch (Exception ex) {
                Debug.WriteLine(ex.ToString());
                throw ex;
            } finally {
                CloseDriver();
            }
        }
        #endregion


        public void CloseDriver() {
            webDriver.Quit();
            webDriver = null;
        }
    }
}
