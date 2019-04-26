import sys
import time

if len(sys.argv) == 2:
    text = sys.argv[1]
    for i in range(10):
        print ("Sending message: " + text)
        time.sleep(1)
else:
    print ("Usage: python ./sendTest.py <text_to_print>")