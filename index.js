const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
let avatar = ""
let githubUrl = ""

const writeFileAsync = util.promisify(fs.writeFile);



function getGit(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    return axios.get(queryUrl)
        .then((response) => {
            return {...answers,avatar: response.data.avatar_url, githubUrl: response.data.email
 
            }
            // avatar = response.data.avatar_url;
            // githubUrl = response.data.url;
            // console.log(response.data);
            // console.log(githubUrl);
        })
        
}

function checkEmail(){
    if(!githubUrl){
        return "---Email is unavailable---"
    } else {
        return githubUrl
    }
}


function promptUser() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "What is your GitHub username?"
            },
            {
                type: "input",
                name: "project",
                message: "What is your project name?"
            },
            {
                type: "input",
                name: "desc",
                message: "Please wright a short description of your project"
            },
            {
                type: "list",
                name: "license",
                message: "What kind of license should your project have?",
                choices: ["GPL", "MIT", "Apache", "BSD"]
            },
            {
                type: "input",
                name: "install",
                message: "What command should be run to install dependencies"
            },
            {
                type: "input",
                name: "tests",
                message: "What command should be run to run tests?"
            },
            {
                type: "input",
                name: "needToKnow",
                message: "What does the user need to know about using the repo?"
            },
            {
                type: "input",
                name: "contribute",
                message: "What does the user need to know about contributing to the repo?"
            }
        ])


}


function generateReadMe(answers) {
    return `
![Badge](https://img.shields.io/badge/license-${answers.license}-brightgreen.svg)

# ${answers.project}
                          
## Description
                          
${answers.desc}
                          
## Table of Contents
                          
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
                          
## Installation
                          
To install necassary dependencies, run the following command:
                          
${answers.install}
                          
## Usage
                          
${answers.needToKnow}
                          
## Contributing
                          
${answers.contribute}
                          
## Tests 
                          
To run test, run the following command:
                          
${answers.tests}
                          
## Questions
                          
![GitHub Avatar](${answers.avatar})
            
If you have any questions about the repo, open an issue or contact ${checkEmail()} directly
            
`;
}


promptUser()
    .then((answers) => {
        return getGit(answers);

    })
    .then((answers) => {
        const md = generateReadMe(answers);
        return writeFileAsync("READme.md", md)

    })
    .then(() => {
        console.log("success");

    })
    .catch((err) => {
        console.log(err);

    });










// .then(function ({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//       axios.get(queryUrl)
//           .then((response) => {
//               //   console.log(response.data);
//               let avatar = response.data.avatar_url;
//               let githubUrl = response.data.url             
//               // return writeFileAsync("README.md", md);
//           })
//   })


