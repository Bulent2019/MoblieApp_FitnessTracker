import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons }  from '@expo/vector-icons';

export default function TimerInfo() {
  const [running, setRunning] = useState(false);
  const [msec, setMsec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  let id = 0;
  let n = 0;

  useEffect(() => {
    if (running) {
      if(msec < 9) {
        id = setInterval(() => {
          setMsec(msec => msec + 1)
        }, 100);
        return () => clearInterval(id);
      }  else {
        setMsec(0);
        if(sec < 59) {
          setSec(sec => sec + 1);
          return () => clearInterval(id);
        } else {
          setSec(0);
          if(min < 59){
            setMin(min => min + 1);
            return () => clearInterval(id);
          } else{
            setMin(0);
            setHour(hour => hour + 1);
            return () => clearInterval(id);
          }
        }
      }
    } else {
      return undefined;
    }
  }, [running, msec]);

  const timerReset = () => {
    setMsec(0);
    setSec(0);
    setMin(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>

        <View style={styles.counter}>
            <Text style={styles.timer}>{hour < 10 ? `${n}${hour}` : `${hour}`}:{min < 10 ? `${n}${min}` : `${min}`}:{sec < 10 ? `${n}${sec}` : `${sec}`}</Text>
        </View>

        {
          !running ? 
            ( 
              <Ionicons 
              name="play-circle-outline"
              color="green"
              size={70}
              onPress={() => setRunning(true)}       
              />
            )
          : 
            ( 
              <Ionicons
              name='stop-circle-outline'
              color="red"
              size={70}
              onPress={() => setRunning(false)}     
              />
            )
        }

        <Button 
          title='Reset' 
          color='#fff'
          onPress={() => {
            timerReset();
          }}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  counter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 40,
  },
  timer: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    fontSize: 26,
    width: 150,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
});