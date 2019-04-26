# IoT
## Edge computing for Computer Vision**

**Controller**
The Controller is the control-point for performing recognition objectives
and sending the output to the transmission unit.

To run the modules individually, see the READMEs in the subdirectories.

```
usage: Controller.py [-h] [--detectDelay DETECTDELAY]
                     [--transmitDelay TRANSMITDELAY] [--target TARGET]
                     [--camIndex CAMINDEX] [--showTargets] [--log]
                     [--threshold THRESHOLD] 
                     [--transmissionFile TRANSMISSIONFILE]
```

Example: Performing recognition every 2.5 seconds, transmitting the recognition
results every 50.0 seconds using a transmission file ./path/to/sender

```
python Controller.py --detectDelay=2.5 --transmissionDelay=50.0 
--transmissionFile=./path/to/sender
```

**Web application**
- Found in /app

**Vision unit**
- Found in /vision

**Transmission unit**
- Found in /transmission_unit