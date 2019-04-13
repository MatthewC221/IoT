# One time sender for The Things Network(TTN)

modified based on https://github.com/ernstdevreede/lmic_pi exmaple "thethingsnetwork-send-v1"

### notes
- max length of the message is 51 bytes, messages larger than that are automatically truncated
- program terminates either when the message is sucessfully sent out or when the max runtime has been reached (30 secs)  

### build
`make clean`<br>
`make`

### usage
`./sender <message>`

### output(stdout)
- 1001   => successfully sent out
- 1007   => max runtime reached
- others => woops, unexpected errors
