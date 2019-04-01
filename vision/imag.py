
from imageai.Detection import ObjectDetection
import os
import time

execution_path = os.getcwd()
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
