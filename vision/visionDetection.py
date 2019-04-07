__author__ = 'Jason_Love'

#########################################
## id : z5181392
## Vision detection class
## 2019
#########################################



################################################################################
## imports
################################################################################
from imageai.Detection import VideoObjectDetection
from imageai.Detection import ObjectDetection
import os
import cv2
import time


###########################################################################################################
## CLASS
###########################################################################################################

class visionDetection():

    ######
    ## Initialiser:
    ####
    ## Input:
    ## execution_path = place where yolo file + image files are located
    ## modelFile = file name of model used
    ## i_or_v = 'i' for image, 'v' for video
    ####
    ## Output:
    ## text file named "detected_vid_listings_{day}_{month}_{year}"
    ######
    def __init__(self,execution_path,modelFile="yolo.h5",i_or_v='i'):

        #log file
        self.time=time.strftime("%d_%b_%Y",time.localtime(time.time()))
        self.output=open("detected_listings_"+str(self.time)+".txt","w")
        self.output.close()

        #work path
        self.execution_path=execution_path

        #model
        if i_or_v=='v':
            self.detector = VideoObjectDetection()
        else:
            self.detector = ObjectDetection()

        self.detector.setModelTypeAsYOLOv3()
        self.detector.setModelPath(os.path.join(self.execution_path, modelFile))
        self.detector.loadModel()




    ######
    ## Detection of live (i.e. unstored) still images
    ####
    ## Input:
    ## frame = image
    ####
    ## Output:
    ## outFrame = image of type array with detection markings
    ## detections = array of dictionaries containing name,probability,position of detected objects
    ## output_count = dictionary of number of unique objects)
    ####
    ## detections also logged in detection file if object being searched (self.search) is found
    ######
    def imageDetect(self,frame,log=False, minProb=40):

        outFrame,detections = self.detector.detectObjectsFromImage(input_image=frame, input_type="array", output_type="array",minimum_percentage_probability = minProb)
            
        objectCounts = {}
        for eachItem in detections:
            if eachItem["name"] in objectCounts:
                objectCounts[eachItem["name"]] = objectCounts[eachItem["name"]] + 1
            else:
                objectCounts[eachItem["name"]] = 1


        if log:
            self.frameDetectionLog(detections,objectCounts)

        return outFrame,detections,objectCounts


    ######
    ## Log of what was found in frame
    ####
    ## Input:
    ## frame_number = id of frame if in stream
    ## output_array = array of dictionaries containing name,probability,position of detected objects
    ## output_count = dictionary of number of unique objects
    ####
    ## Output:
    ## update detection log file with new detection log
    ######
    def frameDetectionLog(self,frameNumber=0, outputArray, outputCount):
        self.output=open("detected_listings_"+str(self.time)+".txt","a")

        self.output.write("\nTime: ")
        self.output.write(time.strftime("%a, %d %b %Y %H:%M:%S",time.localtime()))
        self.output.write("\nNumber of unique objects detected: "+str(outputCount))

        for obj in outputArray:
            self.output.write("\n")
            self.output.write(str(obj['name']) + " : " + str(obj["percentage_probability"]) )
        
        self.output.write("\n")
        self.output.close()


    ######
    ## Clear the log
    ######
    def logClear():
        self.output=open("detected_listings_"+str(self.time)+".txt","w")
        self.output.close()



    ######
    ## Live Stream video detection
    ####
    ## Input:
    ## camera = what camera to stream from
    ####
    ## continuously outputs detections in detection log file
    ######
    def videoDetect(self,camera):
        video_path = self.detector.detectObjectsFromVideo(camera_input=camera, save_detected_video=False
                                , frames_per_second=2, minimum_percentage_probability=minProb,
                                per_frame_function = self.frameDetectionLog)#,frame_detection_interval=10)

  


#################################################################################
## Class end
################################################################################

    
####
## if running this code file directly
####
if __name__ == '__main__':
    execution_path = os.getcwd()
    detections=visionDetection(execution_path, i_or_v='v')
    cam = cv2.VideoCapture(0)
    detections.videoDetect(cam)
                                                         
