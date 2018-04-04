import numpy as np
import cv2

im = cv2.VideoCapture(0)

while(True):
    ret, frame = im.read()

    newim = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    cv2.imshow ('Frame',frame)
    cv2.imshow('Grey', newim)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

im.release()
cv2.destroyAllWindows()
