import cv2
import numpy as np
import sys
import time

CAMERA_INDEX = 0

if len(sys.argv) == 2:
    cap = cv2.VideoCapture(CAMERA_INDEX)
    freq = float(sys.argv[1])
    while True:
        ret, frame = cap.read()
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        """
        1. Apply necessary transforms (BGR2GRAY, resize, etc.)
        2. Pass transformed frame to prediction
        3. Receive output of prediction
        4. Draw output on frame
        """

        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):   # This will be buffered in the sleep
            break
        time.sleep(freq)

    cap.release()
    cv2.destroyAllWindows()
else:
    print ("Usage: python ./vision_input.py <capture_freq_by_sec>")   
