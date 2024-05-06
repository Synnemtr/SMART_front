# SMART 2024 (frontend)

![Insalogo](./Images/logo-insa_0.png)

Students: Alexis Bruneau, Axel Maillot, Synne Moe Trettenes

### Abstract
This is the frontend for the SMART-project at INSA Lyon there the objective is to introduce game-elements for different game-elements to a user based on their main HEXAD-12 type as well as their motivation-score using the SDI.

## Description 
This is the app from the project __Adaptive and Privacy-Aware Persuasive Strategy for behavior change (APAPS)__ team DRIM, funded by [LIRIS laboratory](https://liris.cnrs.fr/), [INSA Lyon](https://www.insa-lyon.fr/) and partner [University of Passau](https://www.uni-passau.de/en/).

## Project Goal
The main aim of this project is to develop another branch of the already ongoing app-development of the APAPS-project. For this sub-branch, the team will focus on the gamification aspect of the APAPS-project. How should the game-elements be created and stored? In which way should users (with their player-type), game-elements and algorithm be connected? This will include creating user HEXAD-12 types as well as give users motivation scores based in the SDI (Ryan and Deci 2000) and HEXAD-12 (Krath et al. 2023) theory. The main objective of this project will be to create and implement an algorithm to choose the correct game element for the specific user based in HEXAD-12 player type. This algorithm should also be able to evolve over time, as the user’s motivation might change, or the HEXAD-12 type can become a different one, while the user uses the app. In order to create this algorithm, there also has to be created several game-elements for the different existing HEXAD-types; socialises, free spirits, achievers, philanthropists, players, and disruptors Krath et al. 2023. Data collected by Felix B  ̈OLZ (PhD at the University of Passau) mostly through a seminar called ”Data collection and processing on sustainable and healthy food” can also be used to test the implementation of the algorithm on different users. This seminar is part of the course catalogue of the Faculty of Computer Science and Mathematics of Passau1. The data has been gathered online using a web application. The  goal is to create an algorithm/ a recommender system that determined what game element to introduce to a user based on collaborative filtering with user-user similatiry. The purpose of the System: The recommender system is designed to suggest game elements to users based on their interests and similarities with other users. It uses collaborative filtering to find users with similar preferences and suggest items accordingly.Ratings are given explicit and is provided by users on a scale (e.g., 1 to 5 stars). How do you determine which users are similar to one another? 
Cosine Similarity: Cosine similarity is a measure of similarity between two vectors. It is calculated as the cosine of the angle between them. For two users, the similarity is calculated based on their ratings for common items. Similarity Matrix: A matrix where the rows and columns represent user IDs, and the values are the cosine similarity between users. Sorting Recommendations: Sort recommendations by predicted rating in descending order to recommend the most fitting element. Fallback for New Users: If the user has no ratings, generate random recommendations based on their HEXAD-12 type.


## Requirements
Node.js \
`npm install -g @ionic/cli native-run cordova-res` \
This is a command to install several Node.js packages globally (-g flag) using npm (Node Package Manager).

### Installation
1. Clone the repository
2. Install the requirements
3. Make sure the backend is running 
4. Run the server by using the command `ionic serve`
5. Go to http://localhost:8100/ to use the application
6. Enjoy!
