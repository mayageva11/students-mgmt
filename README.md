Project Planning


Requirements:
Creating a CRUD(Create, Read, Update & Delete) app.
It must contain at least 2 pages:
A table view with a list.
An item creation page.
The app must have a pleasant user experience.
Clean and organized code is required.

Extra requirements(must include at least one of them). The choice extra requirements are marked with  ✔️:

1.A login page with password authentication.

2.If we decided to create an authentication system, is must use JWT or other user authentication systems.

3.Dark Mode support

4.Searching items by query ✔️

5.Should consider whether or not the filtering should be done on the client or the server.

6.Responsive design.

7.Filtering of items according to the table columns. 

8.File upload support.

9.Anything else that comes to mind.

Technological requirements:
The frontend side must be written using React\Next.js or any other JS/TS frontend framework.
The DB must be either MongoDB or PostgreSQL.


Extra technological requirements:
TailwindCSS usage is nice to have.✔️


Technician decision:
We’ll choose Next.js as our FE framework for the following reasons:
1.The SSR capabilities are a bonus.

2.The page navigation capabilities of Next.js are intuitive.

3.Having the client and the server made in the same app makes things easier to handle when writing an app of this scale.

4.Since we chose Next.js as our framework, we’ll use it’s server API as our backend.

5.When choosing a database the first question to be made is whether or not to choose a relational DB or non-relational DB. Since, at the end of the day our data isn’t complex and doesn’t have many relations needed between our “classes” I decided to create a MongoDB database.

6.Most of the component design will be made with TailwindCSS to comply with the company’s standards.


Product:
A student list management app.
The app will allow the user to maintain, search create, edit and delete users from the list.

DB Design:
The Student object will have the following fields:
id
first name
family name
birth date
grade


