Feature: Google
	In order to find places
	I want to search in Google maps and retrieve its results. 

@google     
Scenario: Find Places  
	Given I entered "drogarias" into google maps
	When I press search
	Then I should get a list of places found by google
