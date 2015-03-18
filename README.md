To run the client side code then do the following:

Open a terminal and go to the root directory. Run "npm install; bower install; gulp"
Then in another terminal tab go to the root directory. Run "python -m SimpleHTTPServer"

Then you can just go to localhost:8000 and it will work



If you want to view unit tests then do the following:

Open a terminal and go to the root directory and run "node_modules/karma/bin/karma start karma.config.js"

It will run the unit tests and you can also see the coverage by going into the /coverage directory in the root of the project.

There you will see a unit test folder Linux, Mac and whatever you are running on - open the correct folder and then the index.html file within it