
Project Status : <strong>In construction.</strong>
-

-----------------------------------------------------------

<strong>Milestone Project 2</strong>
-

The purpose of this project is to show the data from our
international-visitors-london.csv file. In this dashboard I have displayed this
data in the form of bar-charts, pie-charts and a scatter chart. There was an 
attempt to use more types of charts but due to the large volume of data they
kept crashing the dashboard or just not worked correctly.

-----------------------------------------------------------

<strong>UX</strong>
-

this dashboard was designed to show information regarding people who traveled to
London between the year 2002 - 2018. The idea was to correlate all the information
into charts that would be interactive allowing the user to crossfilter all the
charts so they could see how each effected the other.

-----------------------------------------------------------

<strong>Wire Frames</strong>
-

I have included two images into this project that contain the wire frames. I
attempted to stick to the design I made at first but complications made me slightly
change what the dashboard looks like. The current layout of the dashboard is the
closest i could get to the wire frames i made.

-----------------------------------------------------------

<strong>Preview</strong>
-

The following link sends you to the preview of this dashboard:<strong><a href="
https://preview.c9users.io/danielhayes/milesto
ne-project-2/index.html?_c9_id=livepreview1&_c9_host=https://ide.c9.io" target=
"_blank">
Milestone project 2</a></strong>

<strong>Git hub update</strong>
-

There was a slight problem at the begining of this project with github refusing
to accept my push commands due to deleting a file i added by mistake.
this was fixed by deleting the repository on github website and starting it
again. Luckly all pushes i originaly did were re-added with the time stamps 
and comments that i used when i originaly pushed them to github.

-----------------------------------------------------------

<strong>Technology’s:</strong>
-

<a href="https://en.wikipedia.org/wiki/HTML" target="-blank"><strong>HTML</strong></a> 
- 
This is the standard language for making websites.

<a href="https://en.wikipedia.org/wiki/Sass_(stylesheet_language)#SCSS" target="-blank"><strong>SCSS</strong></a>
- 
In combanation with Bootstrap I used my own scss files to give the dashboard a personal touch.
This also allowed me to get the dashboard to work properly on all devices, and to the look i was hoping for.


<a href="https://en.wikipedia.org/wiki/JavaScript" target="-blank"><strong>JavaScript</strong></a>
-
JavaScript was used to make all the charts, to do this it required the d3, dc, crossfilter
JavaScript files aswell as my own graph file that contains the functions for the charts.
The queue file makes all the javascript wait until the dashboard is rendered.


<a href=”http://getbootstrap.com” target="-blank"><strong>Bootstrap</strong></a>
- 
I used Bootstrap to give the 
dashboard a basic styling, suported with my own scss files for a personal look.

-----------------------------------------------------------

<strong>Deployment:</strong>
-

As like my first project I have uploaded my project to Github for storage and deployment
due to the simple methods to do so. To upload to Github you first have to create 
a repository on github then enter the following commands onto the command window on cloud 9:


- git remote add origin git@github.com:Danhayes3008/repository-name.git
- git inital
- git add .
- git commit -m "update" .
- git push -u origin master


By doing this all the work on the website is backed up incase there is problems with 
the development side. It will allow me to recover a previously deployed file allowing me to
recover any information that was lost or incorrectly altered.


To try this locally through cloud 9 inter the following command into a blank workspace's terminal:
git clone https://github.com/Danhayes3008/Milestone-project-2.git

-----------------------------------------------------------

<strong>contrabutions</strong>
-

<strong>JoWings</strong>
-

I received help from joWings on the slack chat room with regards to the reset
element that allows me to reset all charts and the select menu.
She also helped me improve on the reset button so that i wouldnt have problems
thurther down the road when i start using Jquery.


<strong>Marie O</strong>
-

Marie O on slack chat room helped me by viewing the dashboard and giving some
feedback back about the ux. she has suggested the
following changes to imrove the site:

- change the footer background colour

- remove the types of charts from the chart title

- add thicker font onto x-axis column names as there hard to read

- needed to add caps to the country of origin title

- remove the ' from page title

- add more colours to the charts instead of just different shades of green

- add currency denomination to the total spend

- total visited need to be more clearer as she didnt know what that was for.

-----------------------------------------------------------

<strong>KoenDeMol</strong>
-

found an awnser to a problem on git hub. <a href="https://github.com/KoenDeMol">
KoenDeMol</a> responded to someone who had the same problem giving
at solution which was to add ._rangeBandPadding(1) into the chart coding

<strong>Gordon Woodhull</strong>
-

found a way to add percentages into my piecharts. Acknowlagemnt for this bit of
code goes to <a href="https://github.com/gordonwoodhull" target="_blank">Gordon
Woodhull</a> on github.

image is from Wikipidia