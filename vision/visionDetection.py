__author__ = 'Jason_Love'

#########################################
## id : z5181392
## Vision detection class
## 2019
#########################################

import os
import numpy as np
import time
import cv2

class visionDetection():


    ######
    ## Initialiser:
    ####
    ## Input:
    ## minimumProbability = threshold probability of accepting detection
    ## executionPath = place where yolo file is located
    ####
    ## Output:
    ## text file named "detected_vid_listings_{day}_{month}_{year}"
    ######
    def __init__(self, minimumProbability = 0.2, executionPath = os.getcwd()):

        #log file
        self.output = open("detected_listings.txt", 'w')
        self.output.close()

        #model files
        prototxt=os.path.join(executionPath, "MobileNetSSD_deploy.prototxt.txt")
        model=os.path.join(executionPath, "MobileNetSSD_deploy.caffemodel")
        self.detector = cv2.dnn.readNetFromCaffe(prototxt, model)

        self.minProb = minimumProbability

        self.classes= ["background", "aeroplane", "bicycle", "bird", "boat",
	                    "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
	                    "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
	                    "sofa", "train", "tvmonitor"]

        
    ######
    ## Detection of live (i.e. unstored) still images
    ####
    ## Input:
    ## frame = image
    ## autoLog = if want to log everything detected this = True
    ##          else if want to log only certain object detected this = False
    ##          and frameDetectionLog(detections, objectCounts) can be
    ##          called by controller seperately
    ####
    ## Output:
    ## objectArray = array of dictionaries containing name,probability,
    ##                position of detected objects
    ## objectCounts = dictionary of number of unique objects
    ####
    ## detections also logged in detection file if autoLog==True
    ######
    def imageDetect(self, frame, autoLog = False):

        # for finding object box_points latter
        (originalHeight, originalWidth) = frame.shape[:2]
	
	# preprocess image with mean subtraction and normalization
	newFrameSize = (300, 300) # allowed image size as defined by model
	newFrame = cv2.resize(frame, newFrameSize)
	scaleFactor = 0.007843
	meanRGB = 127.5 # of the model's training dataset
        detectionParts = cv2.dnn.blobFromImage(newFrame, scaleFactor,
		                        newFrameSize, meanRGB)

        # pass image parts for detection and prediction
        self.detector.setInput(detectionParts)
        predictions = self.detector.forward()
        
        # making prediction data readable
        objectArray = []
        for detectedItems in range(predictions.shape[2]):
            probability = predictions[0, 0, detectedItems, 2]
            if probability > self.minProb:
                itemName = self.classes[int(predictions[0, 0, detectedItems, 1])]
                boundingBox = predictions[0, 0, detectedItems, 3:7] * \
                              np.array([originalWidth, originalHeight,
                                        originalWidth, originalHeight])
                objectArray.append({'name': itemName,
                                    'percentage_probability': probability,
                                    'box_points': boundingBox.astype("int")})
        
        # grouped by unique detections
        objectCounts = {}
        for eachItem in objectArray:
            if eachItem['name'] in objectCounts:
                objectCounts[eachItem['name']] = objectCounts[eachItem['name']] + 1
            else:
                objectCounts[eachItem['name']] = 1

        if autoLog:
            self.frameDetectionLog(objectArray, objectCounts)

        return objectArray, objectCounts


    ######
    ## Log of what was found in frame
    ####
    ## Input:
    ## frameNumber = id of frame if in stream
    ## outputArray = array of dictionaries containing name,probability,
    ##                  position of detected objects
    ## outputCount = dictionary of number of unique objects
    ####
    ## Output:
    ## update detection log file with new detection log
    ######
    def frameDetectionLog(self, outputArray, outputCount):
        self.output = open("detected_listings.txt", 'a')

        self.output.write("\nTime: ")
        self.output.write(time.strftime("%a, %d %b %Y %H:%M:%S", time.localtime()))
        self.output.write("\nNumber of unique objects detected: "
                          + str(outputCount))

        for obj in outputArray:
            self.output.write("\n\t")
            self.output.write(str(obj['name']) + " : "
                              + str(obj['percentage_probability']) )
        
        self.output.write("\n")
        self.output.close()


    ######
    ## Live Stream video detection
    ####
    ## Input:
    ## camera = what camera to stream from
    ####
    ## continuously outputs detections in detection log file
    ######
    def videoDetect(self, camera):

        print("[INFO] starting video stream...")

        while True:
            ret, frame = camera.read()
            items, count = self.imageDetect(frame)
            self.frameDetectionLog(items, count)

        
####
## if running this code file directly
####
if __name__ == '__main__':
    detections = visionDetection()
    cam = cv2.VideoCapture(0)
    detections.videoDetect(cam)
                                                         
