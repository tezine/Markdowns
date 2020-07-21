# Specflow

* [Specflow](https://specflow.org/) is Cucumber for .Net. It's a pragmatic BDD solution for .NET that uses the [Gherkin](https://cucumber.io/docs/gherkin/reference/) specification (Given-When-Then) language and integrates to Visual Studio. It provides efficient testing solution for the .NET-related platforms, like .NET Framework, .NET Core and Mono.
* It's used by companies like Microsoft, Siemens, IBM, Deloitte, Accenture, Philips, Dell...
* There's more than 100.000 users and over 10 millions downloads. 
* There's an extensive documentation about it [here](https://specflow.org/docs/) and also many source code samples [here](https://github.com/SpecFlowOSS/SpecFlow.Plus.Examples)

# POC

* There's a POC exemplifying Specflow usage [here](./PoC). It's based on the [Getting Started](https://specflow.org/getting-started) example provided by Specflow website. 
* The POC consists of one dotnet standard library project called [Calculator](./PoC/Calculator) and a MS Test Project with Specflow+Runner called [PoCSpecflow](PoC/PoCSpecflow). 
* Instead of Specflow+Runner, it's also possible to create BDD using Specflow + (MSTest, xUnit or NUnit).
* The first step after creating the MS Test Project is to add a feature file. Right click the project under Visual Studio and click "Add New Item.../Specflow/Specflow Feature file". This will add a feature file where you can write the BDD for your project. Ex:

```gherkin
#Calculator.feature
Feature: Calculator
       In order to avoid silly mistakes
       As a math idiot
       I want to be told the sum of two numbers

@mytag
Scenario: Add two numbers
       Given I have entered 50 into the calculator
       And I have also entered 70 into the calculator
       When I press add
       Then the result should be 120 on the screen
```

* Import the [Calculator](./PoC/Calculator) library project into the Specflow project and, after you finalize the feature file, right click on its code under Visual Studio and click on "Generate Step Definitions". This will generate the file [CalculatorSteps.cs](./PoC/PoCSpecflow/Steps/CalculatorSteps.cs), where you can implement the generated methods like below:

```c#
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TechTalk.SpecFlow;

namespace PoCSpecflow {
    [Binding]
    public class CalculatorSteps {
        private Calculator calculator = new Calculator();
        private int result;

        [Given(@"I have entered (.*) into the calculator")]
        public void GivenIHaveEnteredIntoTheCalculator(int number) {
            calculator.FirstNumber = number;
        }

        [Given(@"I have also entered (.*) into the calculator")]
        public void GivenIHaveAlsoEnteredIntoTheCalculator(int number) {
            calculator.SecondNumber = number;
        }

        [When(@"I press add")]
        public void WhenIPressAdd() {
            result = calculator.Add();
        }

        [Then(@"the result should be (.*) on the screen")]
        public void ThenTheResultShouldBeOnTheScreen(int expectedResult) {
            Assert.AreEqual(expectedResult, result);
        }
    }
}

```

* As you may notice above, we execute the Calculator according to the BDD provided in the feature file. 
* Right click on PoCSpecflow project and select "Run Tests". This will build both projects and you can verify the tests results under "Test Explorer window". 
* This POC also provides a report template file ReportTemplate.cshtml that is used to display the tests results in a web page. You'll find the generated html after running the tests under the folder TestResults. 
* You can easily integrate selenium into your BDD. The POC also provides a project called [Google](./PoC/Google) and a Google.feature and associated Step that searches for drugstores using Selenium in Google Maps and retrieves its results using css selectors. 

Enjoy! 

