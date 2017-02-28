# WARNING

You are on your own. I am not responsible for death, injury or damages. You have been warned.       

# carduino

Arduino ECU, headsup display and dyno software for cars.     

# ARDUINO WIRING

pin A0 = distributor hall sensor     
pin 12 = cilinder 1 sparkplug (led)    
pin 11 = cilinder 2 sparkplug (led)    
pin 10 = cilinder 3 sparkplug (led)    
pin  9 = cilinder 4 sparkplug (led)    
usb    = to pc

Install firmware from /firmware folder using arduino software. Please note serialport speed is set to 115200

# WINDOWS/MAC/LINUX SOFTWARE

Download and install nodejs from https://nodejs.org/en/    

Then open command line in the same folder as carduino.js and install the dependencies.    

> npm install express serialport json-scrape moment socket.io    

Now run carduino.js    

> node carduino.js    

Open your browser to http://localhost:3000/ hopefully connections wouldve been made and you can see sensor data coming through.    





