__author__ = 'Jason_Love'

#########################################
## id : z5181392
## Vision detection class
## 2019
#########################################


#########################################
## REFERENCES:
#########################################
## @article{yolov3,
##  title={YOLOv3: An Incremental Improvement},
##  author={Redmon, Joseph and Farhadi, Ali},
##  journal = {arXiv},
##  year={2018}}
#########################################
## @{
##  title={Image AI}
##  author={Olafenwa,Moses and Olafenwa,John}
##  year={2018},
##  sponsor={GitHub,DeepQuestAI},
##  accessed={30/3/2019},
##  url={https://github.com/OlafenwaMoses/ImageAI}}
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
    ## search = item being searched for (look at end of file for list of input options)
    ## i_or_v = "image" or "video" are only input options
    ## execution_path = place where yolo file + image files are located 
    ####
    ## Output:
    ## text file named "detected_vid_listings_{day}_{month}_{year}"
    ######
    def __init__(self,search,i_or_v,execution_path):

        self.time=time.strftime("%d_%b_%Y",time.localtime(time.time()))
        self.output=open("detected_vid_listings_"+str(self.time)+".txt","w")
        self.output.close()

        self.searchItem=search
        self.execution_path=execution_path

        s=time.time()
        if i_or_v=="image":
            self.detector = ObjectDetection()
        elif i_or_v=="video":
            self.detector = VideoObjectDetection()

        self.detector.setModelTypeAsYOLOv3()
        self.detector.setModelPath(os.path.join(self.execution_path, "yolo.h5"))
        self.detector.loadModel()

        e=time.time()
        print(e-s)


    ######
    ## What to look for in frame
    ####
    ## Input:
    ## frame_number = id of frame if in stream
    ## output_array = array of dictionaries containing name,probability,position of detected objects
    ## output_count = dictionary of number of unique objects
    ####
    ## Output:
    ## update detection file with new detection log if object being searched for is detected
    ######
    def frameCapture(self,frame_number, output_array, output_count):
            print("FRA")
            self.output=open("detected_vid_listings_"+str(self.time)+".txt","a")

            if self.searchItem in output_count:

                self.output.write("\n")
                self.output.write("\n")
                self.output.write("Time: ")
                self.output.write(time.strftime("%a, %d %b %Y %H:%M:%S",time.localtime()))
                self.output.write("\nNumber of "+str(self.searchItem)+" : "+str(output_count[self.searchItem]))

                print("FOR FRAME " , frame_number)
                print("Number of "+self.searchItem+" : ", output_count[self.searchItem])

                for obj in output_array:
                    if obj['name']==self.searchItem:
                        print("Prob of "+self.searchItem+" : ", obj['percentage_probability'])
                        self.output.write("\n")
                        self.output.write(str(obj['name']) + " : " + str(obj["percentage_probability"]) )

                self.output.write("\nOther objects: ")
                self.output.write(str(output_count))

                print("Other objects: ",output_count)
                print("------------END OF A FRAME --------------")

            self.output.close()


    ####
    ## Live Stream video detection
    ## camera = what camera to stream from
    ## save = if want to create and save live stream detection video
    ## output = continuously outputs detections in detection file
    ##           and, if save == True, detected video continously updating at execution_path in folder "video" subfolder "Detected"
    ####
    def videoDetect(self,camera,save=False):

        detector = self.detector
        if save==True:
            video_path = detector.detectObjectsFromVideo(camera_input=camera,
                                output_file_path=os.path.join(self.execution_path, "video/Detected/camera_detected_video")
                                , frames_per_second=2, log_progress=True, minimum_percentage_probability=40,
                                per_frame_function = self.frameCapture)#,frame_detection_interval=10)

        else:
            video_path = detector.detectObjectsFromVideo(camera_input=camera
                                        , frames_per_second=2, log_progress=True, save_detected_video=False,
                                        minimum_percentage_probability=40,per_frame_function = self.frameCapture)#,frame_detection_interval=10)


    ######
    ## Detections fom Stored Video
    ## videoName = name of video file being processed as a string
    ## output = string of file path for detected video
    ####
    ## assumes video is stored in same location as execution_path within a folder "video" in subfolder "Original"
    ## outputs video with detection markings in execution_path within folder "video" in subfolder "Detected"
    ######
    def storedVideoDetect(self,videoName):
        detector = self.detector

        video_path = detector.detectObjectsFromVideo(input_file_path=os.path.join(self.execution_path, "video/Original/"+videoName),
                                        output_file_path=os.path.join(self.execution_path, "video/Detected/detected_"+videoName)
                                        , frames_per_second=20, log_progress=True)
        print(video_path)
        return video_path


    ######
    ## Detection of live (i.e. unstored) still images
    ####
    ## Input:
    ## frame = image
    ## imgType = if image is an "array","file"
    ####
    ## Output:
    ## detections = 2 item array:
    ##              *image of type imgType with detection markings,
    ##              *array of dictionaries containing name,probability,position of detected objects
    ## output_count = dictionary of number of unique objects)
    ## detections also logged in detection file if object being searched (self.search) is found
    ######
    def imageDetect(self,frame,imgType):
        detector = self.detector

        detections = detector.detectObjectsFromImage(input_image=frame, input_type=imgType, output_type=imgType)#,output_image_path=os.path.join(execution_path , "images/Detected_"+time.strftime("%a_%d_%b_%Y %H_%M_%S",time.localtime())))

        objects_count = {}
        for eachItem in detections[1]:
            try:
                objects_count[eachItem["name"]] = objects_count[eachItem["name"]] + 1
            except:
                objects_count[eachItem["name"]] = 1

        self.frameCapture(0,detections[1],objects_count)

        return detections,objects_count


    ####
    ## Detection of saved/stored still images
    ####
    ## Input:
    ## image_name = name of image file as string
    ####
    ## Output:
    ## detections = array of dictionaries containing name,probability,position of detected objects
    ## output image = image with detections marked
    ## log in "detected_listings.txt" of everything detected
    ####
    ## assumes video is stored in same location as execution_path within a folder "images" in subfolder "Original"
    ## outputs video with detection markings in execution_path within folder "images" in subfolder "Detected"
    ######
    def imageSavedDetect(self,image_name):
        detector=self.detector
        self.output=open("detected_listings.txt","w")
        self.output.write("\n")
        self.output.write(image_name+":")

        detections = detector.detectObjectsFromImage(input_image=os.path.join(self.execution_path , image_name), output_image_path=os.path.join(self.execution_path , "images/Detected/detected_"+image_name))

        for eachObject in detections:
                self.output.write("\n")
                self.output.write(str(eachObject["name"]) + " : " + str(eachObject["percentage_probability"]) )
                print(eachObject["name"] , " : " , eachObject["percentage_probability"] )

        self.output.write("\n")
        self.output.close()

        return detections


#################################################################################
## Class end
################################################################################

    
####
## if running this code file directly
####
if __name__ == '__main__':
    print("hi")
    detections=visionDetection('person',"video",execution_path = os.getcwd())
    cap = cv2.VideoCapture(0)
    detections.videoDetect(cap, save=True)
                                                         
