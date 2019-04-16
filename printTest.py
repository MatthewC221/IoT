import sys
import time

if len(sys.argv) == 2:
    text = sys.argv[1]
    for i in range(10):
        print ("Result is " + text)
        time.sleep(1)
else:
    print ("Usage: python ./printTest.py <text_to_print>")