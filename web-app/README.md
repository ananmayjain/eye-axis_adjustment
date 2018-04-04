# Starting the Webapp

## Dependencies

1. Typescript: `npm install -g typescript`
2. Angular 4 Command Line Tool: `npm install -g @angular/cli`
3. Flask: `pip3 install Flask`
4. (Not needed at the moment) OpenCV

## Running `main.py`

1. Navigate to `web-app/front-end` folder, run `ng build --prod` to build the angular project. You should see a `static` folder in the `web-app` folder.

2. Navigate back to the `web-app` folder, run `python main.py` to start the server

3. Go to the local host address printed in the terminal or command line in your browser

**If something does not work, clear your browser caches or enable developer mode in your browser.**


# Folder Structure

* **main.py** entry point for the web server
* **front-end** where the angular source code are.
* **static**: where the compiled angular app.

# Streaming System
There is not much resource on how to stream Video from client to 
server running on Flask. So the current implementation is as follows:

1. Capture image in to a hidden `<video>` element;
2. Stream the video in `<video>` element to a `<canvas>` element;
3. Make a picture **string (base64)** out of the `<canvas>` element, when the user clicks the update button.
4. Send the picture string to server, decode it and further process it.