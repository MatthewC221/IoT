import sys

visionPath = './vision'
sys.path.append(visionPath)
import os 
import signal
import subprocess
import platform
import time

import cv2
import numpy as np
import argparse
from visionDetection import visionDetection

testCmdFile = ["python", "./printTest.py"] 
realCmdFile = ["placeholder", "-m"]

# If subprocess is still running, kill and send new data
def spawnTransmissionSubprocess(cmd, transmissionSubprocess, message):
    system = platform.system()
    if transmissionSubprocess and transmissionSubprocess.poll() is None:
        if system == 'Linux':
            os.killpg(os.getpgid(transmissionSubprocess.pid), signal.SIGTERM)
        elif system == 'Windows':
            subprocess.call(['taskkill', '/F', '/T', '/PID', 
                str(transmissionSubprocess.pid)])
        else:
            print ("Kill for [Darwin] Mac")

    if system == 'Linux':
        transmissionSubprocess = subprocess.Popen(cmd + [str(message)], 
            shell=True, preexec_fn=os.setsid)
    elif system == 'Windows':
        transmissionSubprocess = subprocess.Popen(cmd + [str(message)], 
            shell=True, creationflags=subprocess.CREATE_NEW_PROCESS_GROUP)
    else:
        print ("Create subprocess for [Darwin] Mac")

    return transmissionSubprocess

"""
This method will aggregate the new detection results into our current 
detections. This is done because a new detection should not override what
we've accumulated so far.

Imagine: (Transmission every 60 seconds, detect every 1 second)
A man walks by the camera at :05, and exits at :10
In transmission 1 at :60, we want to send {'person': 1}
"""
def aggregateDetections(newDetection, currentDetections):
    for objective, count in newDetection.items():
        if objective in currentDetections:
            currentDetections[objective] = max(currentDetections[objective], 
                count)
        else:
            currentDetections[objective] = count

def main():
    parser = argparse.ArgumentParser(description='Performs recognition on \
        potential objects.')
    parser.add_argument('--detectDelay', default=1.0, type=float,
        help='recognises every n seconds')
    parser.add_argument('--transmitDelay', default=20.0, type=float,
        help='transmits every n seconds')
    parser.add_argument('--target', default='person',
        help='recognition target, --showTargets will display all targets')
    parser.add_argument('--camIndex', default=0, type=int,
        help='index of camera to open')
    parser.add_argument('--showTargets', action='store_true',
        help='show all possible recognition targets')
    parser.add_argument('--log', action='store_true',
        help='log recognition with timestamps')
    parser.add_argument('--threshold', default=0.4, type=float,
        help='threshold for recognition in range [0, 1]')
    parser.add_argument('--realTransmission', action='store_true',
        help='perform real transmissions over LoRa using ./sender')
    parser.add_argument('--transmissionFile', default='./sender'
        help='location of transmission file')

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

    cmd = testCmdFile
    if args.realTransmission:
        cmd = realCmdFile
        cmd[0] = args.transmissionFile

    cap = cv2.VideoCapture(args.camIndex)
    detectDelay = args.detectDelay
    transmitDelay = args.transmitDelay
    shouldLog = args.log
    target = args.target
    threshold = args.threshold * 100
    openCVRed = (0, 0, 255)
    boundingBoxes = []
    DetectionSystem = visionDetection(executionPath=visionPath)
   
    detectionResult = {}
    # Subtract the delays to start tasks immediately
    lastDetectionTime = time.time() - detectDelay 
    lastTransmissionTime = time.time() - transmitDelay
    transmissionSubprocess = None

    while True:
        _, frame = cap.read()
        currentTime = time.time()
        # Detection: shows detection on frame and aggregates result
        if currentTime >= lastDetectionTime + detectDelay:
            lastDetectionTime = currentTime
            boundingBoxes.clear()
            _, detections, newDetectionResult = \
                DetectionSystem.imageDetect(frame, autoLog=shouldLog, 
                    minProb=threshold)
            for detect in detections:
                if detect['name'] == target:
                    boundingBoxes.append(detect['box_points'])
            print ("Recognition objective [{0}]: |detected| = {1}"
                .format(target, newDetectionResult.get(target, 0)))
            aggregateDetections(newDetectionResult, detectionResult)

        # Transmission: creates an updated subprocess to send data
        if currentTime >= lastTransmissionTime + transmitDelay:
            lastTransmissionTime = currentTime
            if len(detectionResult) == 0: continue
            transmissionSubprocess = spawnTransmissionSubprocess(cmd,
                transmissionSubprocess, detectionResult)
            detectionResult.clear()

        for corners in boundingBoxes:
            cv2.rectangle(frame, (corners[0], corners[1]), (corners[2], 
                corners[3]), openCVRed, 2)

        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows() 

if __name__ == '__main__':
    main()
