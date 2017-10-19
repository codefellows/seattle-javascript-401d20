401 JS --  Lab 28 Todo
===

## Submission Instructions
  * Work in a fork of this repository
  * Work in a branch on your fork
  * Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * Submit a pull request to this repository
  * Submit a link to your pull request on canvas
  * Submit a question, observation, and how long you spent on canvas  

## Configuration    
* **README.md** -- with a documention about your lab
* **.babelrc** -- with all dependencies and dev-dependencies 
* **.eslintrc** -- with the class .eslintrc file
* **.gitignore** -- with a robust gitignore
* **.eslintignore** -- with the class .eslintignore
* **package.json** -- with all dependencies and dev-dependencies 
* **webpack.config.js** -- with webpack config
* **src/** -- containing the front end code
* **src/\_\_test\_\_** -- containing the front end tests
* **src/component** -- containing react components
* **src/main.js** -- containing the entire app
* **src/style** -- containing your sass
* **src/style/main.scss** -- for importing and including reset and base

 
## Feature Tasks 
the following components and structure them according to the following diagram.  
``` 
App
  Landing
  Dashboard
    NoteForm
    NoteList
      Noteitem
```
#### App
* The app component should manage the fronted routes and have a navbar
* the `/` route should display the `Landing` component
* the `/dashboard` route should display the `Dashboard` component

#### Landing
* The landing compoent should display a brief description of the notes app

#### Dashboard Component 
* The dasboard component should manage the entire **application state**. 
* The state should contain a notes array
* It should have a bound `addNote(note)` method that adds a note to `state.notes`
  * each note thats added should have the following data
    * `id`: allways should contain the result of `uuid.v1()`
    * `editing`: false by default
    * `completed`: false by default
    * `content`: user provided content
    * `title`: user provided title
* It should have a bound `removeNote(note)` method that removes a note from `state.notes` based on its `id`

#### NoteForm Component
* `onComplete` the NoteForm should add a note to the application state

#### NoteList Component 
* should display an unordered list of NoteItem components

#### NoteItem
* should display the notes content and title
* should display a delete button
  * `onClick` the note should be removed from the application state

## Test
* Test Dasboard
  * Test the intial state
* Test NoteForm
  * Test the intial state

##  Documentation  
Write a description of the project in your README.md
