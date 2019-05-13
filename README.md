
Project Status : <strong>Finished.</strong>
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

This dashboard was designed to show information regarding people who travelled to
London between the year 2002 - 2018. The idea was to correlate all the information
into charts that would be interactive allowing the user to cross-filter all the
charts so they could see how each effected the other.

Even though half the charts do the same thing, they allow the user to see that data in 
different ways. It was not my intention to leave empty space on both sides of the dashboards
but after consideration of possible uses for that space, it occurred to me that some website use
this space for advertisements. As i cannot yet do advertisements on my projects i have decided to
leave the empty spaces for future advertisement use. such advertisements would include trips to London
from various travel agencies, including special deals they would like shown.

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

There was a slight problem at the beginning of this project with git-hub refusing
to accept my push commands due to deleting a file i added by mistake.
this was fixed by deleting the repository on git-hub website and starting it
again. Luckily all pushes i originally did were re-added with the time stamps 
and comments that i used when i originally pushed them to git-hub.

-----------------------------------------------------------

<strong>Technology’s:</strong>
-

<a href="https://en.wikipedia.org/wiki/HTML" target="_blank"><strong>HTML</strong></a> 
- 
This is the standard language for making websites.

<a href="https://en.wikipedia.org/wiki/Sass_(stylesheet_language)#SCSS" target="_blank"><strong>SCSS</strong></a>
- 
In combination with Bootstrap I used my own SCSS files to give the dashboard a personal touch.
This also allowed me to get the dashboard to work properly on all devices, and to the look i was hoping for.


<a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank"><strong>JavaScript</strong></a>
-
JavaScript was used to make all the charts, to do this it required the d3, DC, cross-filter
JavaScript files as-well as my own graph file that contains the functions for the charts.
The queue file makes all the JavaScript wait until the dashboard is rendered.


<a href=”https://getbootstrap.com” target="_blank"><strong>Bootstrap</strong></a>
- 
I used Bootstrap to give the 
dashboard a basic styling, supported with my own SCSS files for a personal look.

-----------------------------------------------------------

<strong>Layout</strong>
-

The layout for this dashboard is very basic, I have gone for a two column layout with the main 
chart on the top just below the menu selector and card elements that contain the total visits 
and total spent amounts. For mobile I have chosen to make the charts one on top of the other 
due to the size of them. Due to this I have added a return link into all the charts so that 
the user may return to the top of the page, so they can access the reset button and menu selector.
Simple colours scheme was chosen to give it a casual look.

The Total spent is in the millions and the Total visited is one thousand for every one, this adds up to over thirteen
million visited in the ten years. 

-----------------------------------------------------------

<strong>Deployment:</strong>
-

As like my first project I have uploaded my project to Git-Hub for storage and deployment
due to the simple methods to do so. To upload to Git-Hub you first have to create 
a repository on Git-Hub then enter the following commands onto the command window on cloud 9:


- First i clicked on the project i wanted to have deployed.
- Then i selected settings and scrolled down to the GitHub Pages section in options.
- Here we must first select the source (the branch to be deployed).
- After selecting the source i selected a theme to be used.
- Next was to choose a domain. This however is not requierd for a course project.

The website address is: <strong><a href="https://danhayes3008.github.io/Milestone-Project-2/" target="_blank">London dashboard</a></strong>

-----------------------------------------------------------

<strong>Bugs</strong>
-

currently there is a bug with the first chart on the dashboard, this bug prevents
any user from viewing the columns for USA and United Arab Emirates. I have found
what i need to do to fix it using the developers tools, but currently don't know
how to implement this into the project.

<strong>bug update:</strong>
-

after some hard work i managed to fix the chart, but the error crept back on just the United Arab Emirates bar.
Unfortunately i cannot remember how i originally fixed this so until i do this bar will be hidden.

All bugs have now been fixed, any other bugs out there are unknown to me due to no concole alerts pointing
problems out to me.

-----------------------------------------------------------

<strong>Testing:</strong>
-

After finishing the coding i conducted some tests on the dashboard through my mobile, tablet and 
desktop. The chart works as expected, it allows the user to select country's through the menu slector
or by clicking on the sections of the Country of Origin chart. I followed up by testing the reset button,
there is a small issue when it is clicked that the Total Spend and Total Visits numbers jerk abit showing
random numbers, but this only lasts whilst it is rounding up or down to the new total. This same issue crops up
when selecting a part of each chart. I currently do not know how to solve this but due to these sections of 
the dashboard will be hidden above the top of the screen when the user scrolls down i do not see it to be
a major issue that needs fixing before this project is published.

Most of my testing was done during development, i would do some coding then check how it would effect the dashboard
on the screen resolution i was trying to effect. The evidance for this will be pressent in the commit logs on my
workspace on Git-Hub.

-----------------------------------------------------------

<strong>contributions:</strong>
-

<strong>JoWings</strong>
-

I received help from joWings on the slack chat room with regards to the reset
element that allows me to reset all charts and the select menu.
She also helped me improve on the reset button so that i wouldn't have problems
Further down the road when i start using J query.

Jo also provided me with a way to make my large charts look better on smaller screens
by adding overflow: auto to the charts it is needed on.


<strong>Marie O</strong>
-

Marie O on slack chat room helped me by viewing the dashboard and giving some
feedback back about the UX. she has suggested the
following changes to improve the site:

- change the footer background colour

- remove the types of charts from the chart title

- add thicker font onto x-axis column names as there hard to read

- needed to add caps to the country of origin title

- remove the ' from page title

- add more colours to the charts instead of just different shades of green

- add currency denomination to the total spend

- total visited need to be more clearer as she didn't know what that was for.

-----------------------------------------------------------

<strong>KoenDeMol</strong>
-

found an answer to a problem on Git-Hub. <a href="https://github.com/KoenDeMol">
KoenDeMol</a> responded to someone who had the same problem giving
at solution which was to add ._rangeBandPadding(1) into the chart coding

<strong>Gordon Woodhull</strong>
-

found a way to add percentages into my pie-charts. Acknowledge for this bit of
code goes to <a href="https://github.com/gordonwoodhull" target="_blank">Gordon
Woodhull</a> on Git-Hub.

<strong>Tim Nelson</strong>
-

after asking for help on the slack channel <a href="https://github.com/TravelTimN" target="_blank">Tim Nelson</a> spent
some time with me when he was already busy trying to help me sort out my problem with the x axis text in 
me country of origin chart. After whilst throwing back and forward possible fixes Tom found a way to make the text
work.

<strong>Simen Daehlin</strong>
-

<a href="https://github.com/Eventyret">Simen Daehlin</a> has helped me out in a big way, after asking for some feedback he has introduced me to some website with library’s
that can improve my project a great deal. The sites he shown me were: <a href="https://coolors.co/aaabbc-8b8982-373f47-6c91c2-c3c9e9">coolers.co
</a>, <a href="http://animista.net/">Animista</a> and <a href="https://introjs.com/">introjs.com</a>.

image is from Wikipedia

<strong>Foot note</strong>
-

Iwould like to make known that all content in this dashboard is for learning purposes and will not be used for commercial use.