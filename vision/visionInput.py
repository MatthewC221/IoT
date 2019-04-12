import sys
import os 
import signal
import subprocess
import platform
import time

import cv2
import numpy as np
import argparse
from visionDetection import visionDetection

# I think there's an issue with setting up the transmissionSubprocess
# I might want it to be in a class, that has an active / not active state

cmdFile = "./printTest.py"
# If subprocess is still running, kill and send new data
def spawnTransmissionSubprocess(transmissionSubprocess, message):
    system = platform.system()
    if transmissionSubprocess:
        print ("Subprocess active = " + str(transmissionSubprocess.poll()))
    if transmissionSubprocess is not None and transmissionSubprocess.poll() \
        is None:
        if system == 'Linux':
            os.killpg(os.getpgid(transmissionSubprocess.pid), 
                signal.SIGTERM)
        elif system == 'Windows':
            os.kill(transmissionSubprocess.pid, signal.CTRL_C_EVENT)
        else:
            print ("Kill for [Darwin] Mac")

    if system == 'Linux':
        transmissionSubprocess = subprocess.Popen(["python", "./printTest.py",
            str(message)], shell=True, preexec_fn=os.setsid)
    elif system == 'Windows':
        transmissionSubprocess = subprocess.Popen(["python", "./printTest.py",
            str(message)], shell=True, 
            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP)
    else:
        print ("Create subprocess for [Darwin] Mac")

def main():
    parser = argparse.ArgumentParser(description='Performs recognition on \
        potential objects.')
    parser.add_argument('--dest', default="results", 
        help='specifies destination of log files if log is on')
    parser.add_argument('--freqDetect', default=1.0, type=float,
        help='recognises every n seconds')
    parser.add_argument('--freqTransmit', default=20.0, type=float,
        help='transmits every n seconds')
    parser.add_argument('--target', default='person',
        help='recognition target, --showTargets will display all targets')
    parser.add_argument('--camIndex', default=0, type=int,
        help='index of camera to open')
    parser.add_argument('--showTargets', action='store_true',
        help='show all possible recognition targets')
    parser.add_argument('--log', action='store_true',
        help='log recognition')
    parser.add_argument('--threshold', default=0.4, type=float,
        help='threshold for recognition in range [0, 1]')

    args = parser.parse_args()
    if args.showTargets:
        print ('''
["person", "bicycle", "car", "motorcycle", "airplane",
"bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign",
"parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra",
"giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard",
"sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket",
"bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange",
"broccoli", "carrot", "hot dog", "pizza", "donot", "cake", "chair", "couch", "potted plant", "bed",
"dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave",
"oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair dryer",
"toothbrush"]
            ''')
        return

    cap = cv2.VideoCapture(args.camIndex)
    freqDetect = args.freqDetect
    freqTransmit = args.freqTransmit
    shouldLog = args.log
    target = args.target
    threshold = args.threshold * 100
    openCVRed = (0, 0, 255)
    boundingBoxes = []
    DetectionSystem = visionDetection()

    lastDetectionTime = time.time()
    detectionResult = {}
    lastTransmissionTime = time.time()
    transmissionSubprocess = None

    while True:
        ret, frame = cap.read()
        currentTime = time.time()
        # Detection: shows detection on frame and saves result
        if currentTime >= lastDetectionTime + freqDetect:
            lastDetectionTime = currentTime
            boundingBoxes.clear()
            _, detections, detectionResult = \
                DetectionSystem.imageDetect(frame, autoLog=shouldLog, 
                    minProb=threshold)
            for detect in detections:
                if detect['name'] == target:
                    boundingBoxes.append(detect['box_points'])
            print ("Recognition objective [{0}]: |detected| = {1}"
                .format(target, detectionResult.get(target, 0)))

        # Transmission: creates an updated subprocess to send data
        if currentTime >= lastTransmissionTime + freqTransmit:
            lastTransmissionTime = currentTime
            if len(detectionResult) == 0: continue
            spawnTransmissionSubprocess(transmissionSubprocess, 
                detectionResult)

        for corners in boundingBoxes:
            cv2.rectangle(frame, (corners[0], corners[1]), (corners[2], \
                corners[3]), openCVRed, 2)

        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows() 

if __name__ == '__main__':
    main()
