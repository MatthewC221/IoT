import cv2
import numpy as np
import sys
import time
import argparse
from visionDetection import visionDetection

def main():
    parser = argparse.ArgumentParser(description='Performs recognition on \
        potential objects.')
    parser.add_argument('--dest', default="results", 
        help='specifies destination of results if log is on')
    parser.add_argument('--freq', default=1.0, type=float,
        help='frequency of recognition per second')
    parser.add_argument('--target', default='person',
        help='recognition target')
    parser.add_argument('--camIndex', default=0, type=int,
        help='index of camera to open')
    parser.add_argument('--showTargets', action='store_true',
        help='show all possible recognition targets')
    parser.add_argument('--log', action='store_true',
        help='log recognition')
    parser.add_argument('--threshold', default=0.4, type=float,
        help='threshold for recognition in range [0, 1]')

    args = parser.parse_args()
    cap = cv2.VideoCapture(args.camIndex)
    freq = args.freq
    target = args.target
    threshold = args.threshold * 100
    lastRecognition = time.time()
    boundingBoxes = []

    Detection = visionDetection()
    while True:
        ret, frame = cap.read()
        if time.time() >= lastRecognition + freq:
            boundingBoxes.clear()
            _, detections, objectCounts = \
                Detection.imageDetect(frame)
            for detect in detections:
                if detect['name'] == target:
                    boundingBoxes.append(detect['box_points'])
            lastRecognition = time.time()
            # cv2.imshow('recognition', recognitionFrame)
            print ("Recognition objective [{0}]: |detected| = {1}"
                .format(target, objectCounts.get(target, 0)))

        for corners in boundingBoxes:
            cv2.rectangle(frame, (corners[0], corners[1]), (corners[2], \
                corners[3]), (0, 0, 255), 1)

        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):   # This will be buffered in the sleep
            break

    cap.release()
    cv2.destroyAllWindows() 

if __name__ == '__main__':
    main()
