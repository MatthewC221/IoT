# One time sender for The Things Network(TTN)

modified based on https://github.com/ernstdevreede/lmic_pi exmaple "thethingsnetwork-send-v1"

### notes
- max length of the message is 51 bytes, messages larger than that are automatically truncated
- program terminates either when the message is sucessfully sent out or when the max runtime has been reached (default 60 secs)  

### build
`make clean`<br>
`make`

### usage
`./sender -h`

### output(stdout)
- 1000   => message succesfully sent out and acked
- 1001   => successfully sent out
- 1002   => message length too large
- 1003   => message succesfully sent out but not acked
- 1007   => max runtime reached
- others => woops, unexpected errors
