// CARDUINO v0.0.1
// github.com/bitlabio/carduino

void setup() {
  // initialize the serial communication:
  Serial.begin(115200);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
}

int lastv = 0;

unsigned long count = 0;

unsigned long lasttime = 0;

void loop() {
  // send the value of analog input 0:
  int voltage = analogRead(A0);
  
  if (voltage+1 < lastv) { count++;
    //Serial.println(count); 
    unsigned long time= micros();
    unsigned long timedelta = time - lasttime;

    //Serial.print("timedelta microseconds:");
    //Serial.println(timedelta);
    
    double rpm = timedelta;
    rpm = (1.0 / (rpm * 4.0 / 1000000.0)) * 60.0 ;
    Serial.print("{\"rpm\":");
    Serial.print(rpm);
    
    Serial.print(",\"count\":");
    Serial.print(count);    
    
    Serial.print(",\"timedelta\":");
    Serial.print(timedelta);    
    
    Serial.println("}");
    lasttime = time;
    engine(count%4, 50); //rotation and spark duration
   } 
  
  lastv = voltage;

  //delayMicroseconds(10);
}

int nextpiston = 1;

void engine(unsigned long count, int duration) {
    
    if (count == 0) { 
      digitalWrite(13-nextpiston, 1);
      delayMicroseconds(duration);
      digitalWrite(13-nextpiston, 0);
      
      //FIRING ORDER
      switch (nextpiston) {
          case 1:
            nextpiston = 3;
            break;
          case 2:
            nextpiston = 1;
            break;
          case 3:
            nextpiston = 4;
            break;
          case 4:
            nextpiston = 2;
            break;
          default: 
            nextpiston = 1; //backup to 1. shouldnt be needed.
          break;
        }
      // END ORDER
      
    }
  

}
