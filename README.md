# The Quiz Hub
<div style="text-align:center;">
<img src="https://raw.githubusercontent.com/D0nni387/The-Quiz-Hub/master/assets/images/the-quiz-hub-preview.png"></img>
</div>

---

## Contents:

* UX
    * Project Goals
    * User Goals
    * User Stories
    * Designer Goals
    * Design Choices
        * Fonts
        * Colours       
* Wireframes
* Features
* Future Goals
* Technology Used
* Testing
    * Issues and Resolutions
* Known Bugs
* Deployment
* Credits
* Acknowledgements

---

## UX (User Experience)

### Project Goals

The goal of this project is to create a simple and user friendly quiz game sourcing data from a trivia API to allow for a new constant feed of new questions across various categories whilst removing the requirement to program new questions to keep this up to date. This will give users a reason to come back and keep playing when they have completed the quiz.

### User goals

The main expected user is a broad field but expected to fall into one of the below criteria

1. A casual user
2. Someone wanting a quiz time waster with little to invest
3. Quiz enthusiast

With regards to other sites online, this site ideally needs to be

1. Easy to use
2. Be quick and easy to start and complete
3. Be able to restart and keep the user engaged consistently
4. Be updated with new content regularly 
5. Visually appealing but not too harsh on the eye


### User stories

1. As a user i want the site to be easy to use with a colourful and welcoming inferface.
2. As a user i want to be able to choose what questions i'm given
3. As a user i want to be able to select how hard the questions are so my kids could play it
4. As a user i want to be challenged!
5. As a user i want to come back and know i'm getting new questions not the same quiz over and over.

### Designer goals 

1. Create a simple but engaging quiz game
2. Minimise continued maintanence with externally sourced quiz questions
3. Be engaging enough to hold peoples attention to users coming back to the site after first use.

### Design Choices

#### Fonts

Due to the minimal approach to the design i decided to use a single font to allow the content to be consistent throughout, deciding on Solway provided through the google font service, i felt this offered the user a simple easy to read font allowing content to be easily read on all devices.

#### Colours

After discussing various colour combinations with potential users of this site, i decided upon the following fonts allowing for a vibrant colour pallet with good contract ratios.


* Background color: #2828fc 
* Logo & Content: #e6a11c 3.38 contrast score with a black outline allows the content to stand out easily.
* Text and social icons: #d3d3d3 5.01 contrast score over background.
* Text over answers: #000 a standard black text allows answers to be easily read.
 
---

## Wireframe Mockups:

### Desktop
<div style="text-align:center;">
<img src="https://raw.githubusercontent.com/D0nni387/The-Quiz-Hub/master/wireframes/desktop-quiz-layout.png"></img><br>
</div>

### Tablet

<div style="text-align:center;">
<img src="https://raw.githubusercontent.com/D0nni387/The-Quiz-Hub/master/wireframes/tablet-quiz-layout.png"></img><br>
</div>

### Mobile

<div style="text-align:center;">
<img src="https://raw.githubusercontent.com/D0nni387/The-Quiz-Hub/master/wireframes/mobile-quiz-layout.png"></img>
</div>

---

## Features

As the primary feature of the site is to provide a quiz application to the user it will allow the below options to expand the users experiance to their tastes.

### Select a topic

The user is presented with an option to choose a topic of choice from all available topics helping to provide a more tailored game to the user.

### Select Difficulty

For younger users or for people wanting a lesser or harder challenge the user is given the option to select a difficulty of questions from either Easy, Medium or Hard.

### Select Number Of Questions

As people may want a longer game or shorter game the user is presented with the option to select the amount of questions the app will provide them.

### Sweet Alert

When the user selects an answers the user is presented with a popup to give the outcome of their answer, this was initially handled through CSS classes however Sweet Alert offered a much better experience for the user.

### Full Playable Quiz To Users Choice

With the implimentation of all of the above features, this allows the user to have a customised quiz to their choice.

---

## Future Goals

As this application develops going forward the future goals for the project are

### Global Leaderboards

With the user being presented with a score upon completion, ideally in the future as my skills increase, adding a leader board could help incetivise users to keep playing and trying to being their score or potentially beat a friend

### Challenge Mode

In future i would also like to add a challenge mode which would mix genres and test the user in an initial test of a chosen topic then on general knowledge which could also feed into a leaderboard system


---

## Technology Used

* HTML 
* CSS 
* JavaScript 
* [Bootstrap](https://getbootstrap.com/) - to help adapt for numerous input types
* [Sweet Alert 2](https://sweetalert2.github.io/) - Popups for answer feedback 
* [Google Fonts](https://fonts.google.com/) - 
* [VSCode](https://code.visualstudio.com/) - IDE for local development
* [GIT](https://git-scm.com/) - Version Control
* [GitHub](https://github.com/) - to host the repositories for this project and the live 
website preview

---

## Testing

As this was my first time developing a full project using JavaScript & external API data i ensure i was extremely thorough with testing to ensure that all functions ran correctly and data was provided to the DOM as expected without any issues. Taking this approach has helped increase my knowledge of JavaScript and best practice greatly.

#### Test Planning

As this project is the most complex thing i have worked on, i wanted to ensure that a methodical approach was taken with constant feature testing throughout development. In it's inital state i created dummy html items to ensure data was being passed and displayed correctly and as expected. In future projects i will look to using more automated testing to aid me in my development. 

#### Testing Stories

* Upon my initial completetion of JS features i was told that my colour pallet was too dull and "boring" which was against my intial plan for the project which led to me implimenting a new colour scheme.

* In my initial coding stages i was using the classic XHR http request which i found to be quite cumbersome to develop with which led me to learn and use the newer fetch API method which i found much easier to use and sped up my progress greatly

* When i was initially developing the confirmation of correct answer, i used css classes to clarify with either a red or green to indicate a correct or incorrect answer, speaking with users this was found to be fit for purpose but dull. At this point i made the decision to move to Sweet Alert to allow for a much more engaging feature for the user.

---

## Overall:

### Responsiveness -
I decided to develop the site based around bootstrap as this is a utility i'm acustomed with and allowed me to make sure the site was responsive to all devices accessing the site. Using this grid system made laying out items quick and easy.

### Design -
The main aim of my site was to use a simple but vivid colour pallet to help the site feel welcoming and also easy to use, to aid me in this i used bootstrap to help me style elements such as buttons and dropdowns. When chosing a colour pallet i used both [contrast-ration.com](https://contrast-ratio.com/) & [colorsafe.co](http://colorsafe.co/) to ensure my choices are easily to read and follow WCAG Guidelines

### Features -

#### Self Populating Category List

##### Plan: 
During my intial development of this project i found an API i wanted to use which provided a wide variety of categorys to choose from, as this could change if content creators added new categories, i wanted this to be self populating from the API.

##### Implementation:
When researching the API documentation, i found the site offered their categories list as a seperate API. When loading the site, i used the fetch API to obtain this list which is then sorted and passed across to the DOM.

##### Result:
The categories list drop down operates as expected, populating the API data to the DOM allowing the user to select a required category which then influences the Quiz data pulled from the API.

#### Full Playable Quiz

##### Plan:
The main aim of the project was to have a fully playable quiz from the choices provided by the user, sourced from an external API which is being continously updated.

##### Implementation:
Looking through the API documentation, I created a variable for the base url to access the data which was then completed using the users choices. When these variables had been defined i used the Fetch API function to get the required data, convert to json and then mapped to allow the data to be accessible and functional. After this the answers were put into an array and randomised to ensure if the question was accessed again in a playthrough the answers weren't displayed in the same place.

##### Result:
The quiz operates as expected, allowing the user to play their chosen quiz in full consistently and without bugs.

#### End Of Game Options

##### Plan:
At the end of the game the aim was to provide the user with the choice to play the game again with the same choices or to go back to the start to choose a new category/difficulty/question number

##### Implementation:
When creating the results page i decided the best approach would be to give the user two buttons, one to restart the quiz with the same conditions the other to go back to the start of the game and offer the choices again.

##### Result:
This worked as expected with little effort.

#### Trivia API

##### Plan:
Later in development, one of my users said the initial welcome page could use some extra content, i decided on implementing another API to provide a piece of random trivia

##### Implementation:
As i had already completed work on my quiz, i used the same methods to fetch the API data and pass to the DOM

##### Result:
This worked as expected, however the API chosen has proven to be unreliable as it's down frequently.
---

### Issues and resolutions
During development of this project i encountered a number of bugs which stalled progress, below are examples of the larger bugs and the fixes.

##### Bug:
When sweet alert opened to show the result, it continued to iterate through the questions array

##### Fix:
To fix this i decided to make sure that when the user selected an answer it would stop accepting inputs until the next question was loaded, this was done by creating a boolean variable which toggled true and false.

##### Result:
This fixed the issue and allowed all questions to be produced as expected.

##### Bug:
When the user selected the amount of questions they wanted, it would always give 10 questions.

##### Fix:
This was due to the wrong id being reference causing the API to default to 10 questions, changing the variable to the correct id corrected this.
##### Result:
When this was changed the correct amount of questions were provided from the API.

##### Bug
On Apple and Samsung default browsers, the logo was being warped.

##### Fix
To fix this i found an error in my bootstrap html causing the logo element to sit outside of it's container.

##### Result
The logo in initial testing now scales correctly.

### Known Issues

The only known issue at the moment is the Trivia API is down so the catch error is being produced to the DOM.

---

## Deployment

To deploy this page to GitHub Pages from its [GitHub repository](https://d0nni387.github.io/The-Quiz-Hub/), the following steps were taken: 

1. From the menu items near the top of the page, select **Settings**.
2. Scroll down to the **GitHub Pages** section.
3. Under **Source** click the drop-down menu labelled **None** and select **Master Branch**
4. On selecting Master Branch the page is automatically refreshed, the website is now deployed. 
5. Scroll back down to the **GitHub Pages** section to retrieve the link to the deployed website.
 

### How to run this project locally

To clone this project from GitHub:

1. Under the repository name, click "Clone or download".
2. In the Clone with HTTPs section, copy the clone URL for the repository. 
3. In your local IDE open Git Bash.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type ```git clone```, and then paste the URL you copied in Step 3.
```console
git clone https://github.com/D0nni387/The-Quiz-Hub.git
```
6. Press Enter. Your local clone will be created.

Further reading and troubleshooting on cloning a repository from GitHub [here](https://help.github.com/en/articles/cloning-a-repository).

---

## Credits

### Content


### Acknowledgements



## Disclaimer
Please note the content and images on this website are for educational purposes only.