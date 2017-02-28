# carduino

new arduino ECU, headsup display and dyno software    

# ARDUINO WIRING

pin A0 = distributor hall sensor     
pin 12 = cilinder 1 sparkplug (led)    
pin 11 = cilinder 2 sparkplug (led)    
pin 10 = cilinder 3 sparkplug (led)    
pin  9 = cilinder 4 sparkplug (led)    
usb    = to pc

Install firmware from /firmware folder using arduino software. Please note serialport speed is set to 115200

# PC SOFTWARE

Download and install nodejs from https://nodejs.org/en/    

Then open command line in the same folder as carduino.js and install the dependencies.    

> npm install express serialport json-scrape moment socket.io    

Now run carduino.js    

> node carduino.js    

Open your browser to http://localhost:3000/ hopefully connections wouldve been made and you can see sensor data coming through.    





