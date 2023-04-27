# Story Forge - Writers Circle

## Description

StoryForge is a web application designed to create a platform for writers to connect and collaborate in small groups known as "writer's circles." The primary goal of these circles is to facilitate the sharing and beta reading of works among writers within a supportive and engaging community. The circles are created by users and moderated by designated individuals.

---
## Table of Contents
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
    
---
## Technologies

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>

---
## Getting Started

This project should be able to run in your favorite IDE. We used VS Code while building it.
<a href="https://code.visualstudio.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>


### Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)

### Installation

1. Fork the repository.
1. Copy the SSH key from your forked repository.
1. In your terminal, execute `git clone {paste SSH link}`.
1. Navigate to the repository's folder using the terminal.
1. Open the folder in VS Code (or your preferred editor).
1. Run `npm install` in the terminal of VS Code to install all dependencies.
1. Create a `.env` file at the root of the project and add the required environment variables.
1. In Postico, create a database named `story_forge_circles`. If you prefer a different name, update the `server/modules/pool.js` file with the new database name.
1. The `database.sql` file provides the necessary queries to create all required tables, along with a dummy data table for testing purposes. When deploying the application to production, make sure to exclude the dummy data from `db_insert.sql` and `db_select.sql`.
1. In your VS Code terminal, execute `npm run server`.
1. Open a second terminal and run `npm run client`.
---
## Usage

After completing the installation and starting the application, it should automatically open in your default browser. If it does not, navigate to http://localhost:3000/#/ to access the application.

For a detailed walkthrough of the application, please watch the following video by [clicking here!]()

---
## Deployment
To deploy updates or make changes to the application, follow these steps:

1. Obtain the Heroku login credentials from the hand-off document.
1. Log in to Heroku and navigate to the story-forge section (or the relevant section for this app).
1. To deploy changes manually, go to the "Deploy" tab and click "Deploy Branch." You can also configure automatic deployment from the same page.
1. Environment variables are stored in the "Settings" tab on Heroku. Click "Reveal Config Vars" to view or modify them.
1. For database setup, we used Postico. To connect, use the information from Heroku:
    * Go to the "Resources" tab and click the Postgres add-on.
    * Navigate to the "Settings" tab and click "View Credentials."
    * Enter the required information in Postico as a new favorite.

