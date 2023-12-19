# CRM APP 👁️

A CRM Application that can be used to organize business tasks and contacts.<br/>
REMINDER: This application is hosted on render's free hosting service with limited RAM, 
  -  Deleting more than one record at a time won't work, but it works if it wasn't dependent on a limited server, like my local dev machine, you'll just have to trust me.
  -  Server also takes about a minute to start up when the site it opened, then the site could be refreshed.
Link to Project: <a src="https://lifein-e0258.web.app/">https://contractorcrm.onrender.com/</a><br/>

<img src="https://gyazo.com/76fbd87920b7816dc5558e134fade666" style="width:1500px; height:500px"/>



## 👇 Getting Started 👇<br/>


### How It's made:<br/>

**Tech used** 🖥️: <br/>
HTML, CSS, JavaScript, Typescript, ReactJS, ChakraUI, Tailwind, NodeJS, ExpressJS, MySql, AWS RDS Database Hosting service 

- For the frontend, I used a mix of CharkraUI's style components for things like the email popup, TailwindCSS for quicker styling, and plain vanilla CSS to do more in depth styling.<br/>
- Then I used ReactJS to organize the Application's file structure and State. <br/>
- It was also my first time using Typescript and is used in the .tsx files.<br/>

- Moving to the backend, I used Node and Express JS to deal with routes and API fetch calls. <br/>
  It also uses Nodemail to handle sending emails to selected records<br/>

- For the Database, I used MySql.<br/>

- To host the Database, I used AWS' RDS Database Hosting Service to host my mySql Database.<br/>



## Lessons Learned and Final Thoughts 🧠:

- This is my most backend/database heavy project so far (12/19/2023), It focuses more on the backend and database querying side rather than the frontend.<br/>
- Altough I didn't get to implement all the features I had planned, such as picture uploads and user auth, I would still like to learn how to implement them in future projects, I just wanted to move on to more complicated projects.

**If I could go back and redo some of the code,** i would <br/>
  - Plan out the headers and records more thoroughly by making width of li and widths of the overall divs more consistent. I was lucky because a CRM doesn't normally need to be mobile responsive.
  - Make the Sql Filter include spaces ex. 'John Doe' shows it as JohnDoe and won't filter right I think, or remove spaces overall when inserting data in mySql except description.
  - There is also a big, not a bug, but most of the css should have been in a general css file because the table would have looked the same, but I removed the home tab and had to put it in the contacts.css so there is some duplication, and since the Tasks page had
  - the most headers, I had to make a seperate file for it and caused so wierdness and trying to customize the css. So what i should have done better was not to over simplify and complicate things without planning to exclude to parts of the code so that it's more consistent.
  - This is the same with the inputs in the click(pages).tsx files, I probably overcomplicated and made the code messy trying to map over inputs to render when each input wasn't consistent such as their properties.
<br/>
   I also did not the functionality to edit records in the Tasks page.
  


## Known bugs 🥲

  -  Sending Email Doesn't work after upload, I added my Google App Password so that the default placeholderemail@gmail.com to send emails to record emails, but it doesnt wor'k after making the site live, error code 500.
  -  Creating a record, after fetch .then() doesn't work, or no response sent back, doesn't 'navigate(-1)', but it does on deleteRecord.
  -  There is no schema rules when editing records, In creating(+) a record, there are rules placed to be in line with the scehma in mysql, but not in the editing part of each record.
  
