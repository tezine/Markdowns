using Google;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using TechTalk.SpecFlow;

namespace PoCSpecflow.Steps {
    [Binding]
    public class GoogleSteps {
        Maps maps = new Maps();

        [Given(@"I entered ""(.*)"" into google maps")]
        public void GivenIEnteredIntoGoogleMaps(string placeType) {
            maps.PlaceType = placeType;
        }

        [When(@"I press search")]
        public void WhenIPressSearch() {
            maps.Search();
        }

        [Then(@"I should get a list of places found by google")]
        public void ThenIShouldGetAListOfTheFirstPlacesFoundByGoogle() {
            var places = maps.PlacesList;
            Assert.IsTrue(places.Any());
        }
    }
}
