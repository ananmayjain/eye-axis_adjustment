import numpy as np
import cv2

face_cascade = cv2.CascadeClassifier('/usr/local/Cellar/opencv/3.4.1_2/opencv/data/haarcascades/haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('/usr/local/Cellar/opencv/3.4.1_2/opencv/data/haarcascades/haarcascade_eye.xml')

im = cv2.VideoCapture(0)

while True:
    ret, frame = im.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    face = face_cascade.detectMultiScale(gray, 1.3, 5)
    '''for (x,y,w,h) in face:
        cv2.rectangle(frame, (x,y), (x+w,y+h), (255,0,0), 2)
        face_grayim = gray[y:y+h][x:x+w]
        face_realim = frame[y:y+h][x:x+w]'''
    eye = eye_cascade.detectMultiScale(gray, 1.3, 5)
    for (ex,ey,ew,eh) in eye:
        cv2.rectangle(frame, (ex,ey), (ex+ew, ey+eh), (0,255,0), 2)
    cv2.imshow("img", frame)
    cv2.waitKey(10)

im.release()
cv2.destroyAllWindows()
