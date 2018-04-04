from flask import *
# from camera import *
import os
import json
import cv2
import base64
import numpy as np

app = Flask(__name__)

def saveToDisk(image, path: str):
    writer = open(path, "wb")
    writer.write(image)
    writer.close()

def binaryStringToCVImage(binaryString):
    numpyarr = np.fromstring(binaryString, np.uint8)
    return cv2.imdecode(numpyarr, cv2.IMREAD_COLOR)

def cvImageToBinaryString(cvImage):
    retval, encoded = cv2.imencode(".jpg", cvImage)
    print(encoded.tostring())
    pass

# Since the web app is a single page application, every sub directory
# is only pointing to the index.html file in static folder.

@app.route("/", methods=["GET"])
@app.route("/diagnostic", methods=["GET"])
@app.route("/welcome", methods=["GET"])
@app.route("/about", methods=["GET"])
def index():
    """
    Render the index page, which is the index.html file in template folder.

    Index pages serves as a welcome screen.

    Returns:
        The rendered index.html page
    """
    return app.send_static_file("index.html")

@app.route("/new_update", methods=["POST"])
def new_update():
    """
    Handle image sent from the client

    """
    print("New frame from client!")
    data = json.loads(request.data)
    imageString = data["image"]

    imageData = base64.b64decode(imageString)

    frame = binaryStringToCVImage(imageData)

    eye_cascade = cv2.CascadeClassifier('/usr/local/Cellar/opencv/3.4.1_2/opencv/data/haarcascades/haarcascade_eye.xml')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    eye = eye_cascade.detectMultiScale(gray, 1.3, 5)
    for (ex,ey,ew,eh) in eye:
        cv2.rectangle(frame, (ex,ey), (ex+ew, ey+eh), (0,255,0), 2)
    while True:
        cv2.imshow("img", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cv2.destroyWindow("img")

    #cvImageToBinaryString(frame)

    # cv2.destroyAllWindows()
    # im = cv2.imread("/Users/ZehuaChen/Desktop/Client.jpg")
    # cv2.imshow("image", im)

    # responseData = json.dumps({
    #     "name": imageData
    # })
    # print(responseData)
    # response = Response(response=responseData, mimetype="application/json")
    # print(response)
    return Response()

if __name__ == "__main__":
    app.run(ssl_context = ("cert.pem", "key.pem"))
