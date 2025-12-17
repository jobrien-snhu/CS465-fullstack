CS 465 Travlr Getaways Full Stack Application

This repository contains the final version of the Travlr Getaways full stack web application I built for CS 465 Full Stack Development with MEAN. The application includes both a customer facing website and an administrative side used to manage trips and data. Over the length of the course, this project grew from a basic Express site into a full stack MEAN application with a REST API, MongoDB database, a single page admin interface, and secure admin login authentication.

This README also acts as a reflection on what I learned while building the project and how the application came together.

Architecture

For the frontend, I used two different approaches depending on the user. The customer facing side of the site was built using Express HTML templates with JavaScript to add some dynamic behavior. This worked well for displaying static and semi dynamic content like travel pages and general site navigation. It was simple to understand and a good starting point for the project early on.

The administrative side was built as a single page application using Angular. The SPA approach allowed the admin interface to feel faster and more interactive since the page does not need to fully reload when data changes. Instead, the Angular app communicates directly with the backend API and updates the page dynamically. Comparing the two approaches really helped me understand when a traditional server rendered site makes sense versus when a SPA is the better option.

The backend uses a NoSQL MongoDB database because it works naturally with JavaScript objects and fits well with the MEAN stack. Using MongoDB made it easier to store and update trip data without needing a rigid schema. This flexibility was helpful as I added new features and adjusted the data structure throughout the course.

Functionality

JSON is different from JavaScript because JSON is only used to store and transfer data, while JavaScript is used to write the actual logic of the application. In this project, JSON acts as the bridge between the frontend and backend. The Angular frontend sends and receives JSON data through API requests, and the Express backend processes that data and interacts with MongoDB.

As the project progressed, I refactored code to improve organization and efficiency. Some logic that was originally repeated in multiple places was moved into reusable components and services. On the frontend, reusable UI components made the admin interface easier to maintain and update. On the backend, separating routes and controllers made the code easier to read and debug. These changes helped reduce duplicate code and made the application more manageable overall.

Testing

Testing in a full stack application involves making sure API endpoints work correctly and return the expected data. I worked with different request methods such as GET, POST, PUT, and DELETE to handle retrieving and modifying data. Each endpoint needed to be tested to ensure it handled requests properly.

Adding authentication made testing more challenging because secured routes require valid login credentials. This helped me better understand how endpoints, middleware, and security work together in a full stack application. It also showed me why proper security is important when dealing with admin level features.

Reflection

This course helped me connect the dots between frontend and backend development and understand how a full stack application functions as a whole. I gained hands on experience working with the MEAN stack, REST APIs, databases, and authentication. I also improved my ability to organize code and think about application structure.

Completing this project gave me more confidence in my ability to build and explain a full stack application. The skills I developed in this course directly support my professional goals and make me a stronger candidate for entry level full stack or web development roles.
