import numpy as np
import cv2
from data_interpreter import *
def detector(frames):
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
    # img = cv2.VideoCapture(0)
    dist_acc = []
    for a in range(2):
        # ret, frame = img.read()
        frame = frames[a]
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow("frame", frame)
        eye = eye_cascade.detectMultiScale(gray, 1.3, 5)
        strabismus = []
        x = 0
        dist_main = []
        while len(eye) == 2 and x < 2:
            if eye[0][0] > eye[1][0]:
                temp = np.zeros((len(eye[0])))
                temp[:] = eye[0,:]
                eye[0,:] = eye[1,:]
                eye[1,:] = temp[:]
            ex,ey,ew,eh = eye[x]
            cv2.rectangle(frame, (ex,ey), (ex+ew, ey+eh), (0,255,0), 2)
            eye_im = frame[ey:ey+eh, ex:ex+ew]
            eye_gray = gray[ey:ey+eh, ex:ex+ew]
            #ret, eye_gray = cv2.threshold(eye_g,55,150,cv2.THRESH_BINARY_INV)
            #ret,eye_gray = cv2.threshold(eye_g,55,255,1)
            #im2, contours, hierarchy = cv2.findContours(eye_gray,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
            rec_center = [ex+ew/2, ey+eh/2]
            x += 1
            try:
                circles = cv2.HoughCircles(eye_gray,cv2.HOUGH_GRADIENT,1.27,20,
                                            param1=50,param2=50,minRadius=0,maxRadius=25)
                circles = np.int16(np.around(circles))
                if len(circles[0] == 1):
                    i = circles[0][0]
                    if i[0] == 0:
                        continue
                    cv2.circle(eye_im, (i[0],i[1]), i[2], (0,255,0), 2)
                    cir_center = [ex + i[0], ey + i[1]]
                    dist = ((cir_center[0] - rec_center[0])**2 + \
                           (cir_center[1] - rec_center[1])**2)**(.5)
                    dist_main.append(dist)
            except:
                continue
        print (dist_main)
        if len(dist_main) == 2:
            dist_acc.append(dist_main)
        cv2.imshow("img", frame)
        #cv2.imshow("eye_gray", eye_gray)
        cv2.waitKey(10)
        if (len(dist_acc) == 20):
            break
    x = np.array(dist_acc)
    print (x[:,0])
    print (x[:,1])
    std_deviation(dist_acc)
    cv2.destroyAllWindows()
