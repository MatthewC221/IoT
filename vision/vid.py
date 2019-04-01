__author__ = 'Noblesse Oblige'

##file
from imageai.Detection import VideoObjectDetection
from imageai.Detection import ObjectDetection
import os


###########################################################################################################
## live
###########################################################################################################

import cv2
import time

class objDetect():
    def __init__(self):
        self.time=time.time()
        self.output=open("detected_vid_listings_"+str(self.time)+".txt","w")
        self.output.close()


    def frameCapture(self,frame_number, output_array, output_count):
            self.output=open("detected_vid_listings_"+str(self.time)+".txt","a")
            if 'person' in output_count:
                self.output.write(str(time.time()))
                print("FOR FRAME " , frame_number)
                print("Number of People : ", output_count['person'])
                for obj in output_array:
                    if obj['name']=='person':
                        print("Prob of Person : ", obj['percentage_probability'])
                        self.output.write("\n")
                        self.output.write(str(obj['name']) + " : " + str(obj["percentage_probability"]) )
                print("Other objects: ",output_count)
                print("------------END OF A FRAME --------------")
            self.output.close()


    def vidDetect(self,camera,execution_path):
        detector = VideoObjectDetection()
        detector.setModelTypeAsYOLOv3()
        detector.setModelPath(os.path.join(execution_path, "yolo.h5"))
        detector.loadModel(detection_speed='fastest')

        video_path = detector.detectObjectsFromVideo(camera_input=camera,
                                        output_file_path=os.path.join(execution_path, "camera_detected_video")
                                        , frames_per_second=2, log_progress=True, minimum_percentage_probability=30,per_frame_function = self.frameCapture)#,frame_detection_interval=10)

        return video_path



    def storedVidDetect(self):
        detector = VideoObjectDetection()
        detector.setModelTypeAsRetinaNet()
        detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
        detector.loadModel(detection_speed='faster')

        video_path = detector.detectObjectsFromVideo(input_file_path=os.path.join(execution_path, "traffic-mini.mp4"),
                                        output_file_path=os.path.join(execution_path, "traffic_detected")
                                        , frames_per_second=20, log_progress=True)
        print(video_path)


    def imgDetect(self,execution_path):
        print(execution_path)
        detector = ObjectDetection()
        detector.setModelTypeAsRetinaNet()
        detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
        detector.loadModel()
        output=open("detected_listings.txt","w")
        t=[]

        for i in range(1,51):
            start=time.time()
            image_name="images ("+str(i)+").jpg"
            print()
            print(image_name)

            detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , "image/"+image_name), output_image_path=os.path.join(execution_path , "Detected/detected_"+image_name))
            output.write("\n")
            output.write(image_name+":")

            for eachObject in detections:
                output.write("\n")
                output.write(str(eachObject["name"]) + " : " + str(eachObject["percentage_probability"]) )
                print(eachObject["name"] , " : " , eachObject["percentage_probability"] )

            output.write("\n")
            end=time.time()
            t.append(end-start)
            print("time taken: ",end-start)

        output.close()

        print("AVG:",sum(t)/len(t))

if __name__ == '__main__':
    print("hi")
    execution_path = os.getcwd()
    camera = cv2.VideoCapture(0)
    detections=objDetect()
    detections.vidDetect(camera,execution_path)