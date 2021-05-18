import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons }  from '@expo/vector-icons';

export default function TrainingStart() {
  const [running, setRunning] = useState(false);
  const [msec, setMsec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  let id = 0;
  let n = 0;

  
  useEffect(() => {
    if (running) {
        if(msec < 99) {
          id = setInterval(() => {
            setMsec(msec => msec + 1)
          }, 10);
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

      <View style={styles.counter}>
        <Text style={styles.timer}>{min < 10 ? `${n}${min}` : `${min}`}:{sec < 10 ? `${n}${sec}` : `${sec}`},{msec < 10 ? `${n}${msec}` : `${msec}`}</Text>
      </View>

      <Button 
        title='Reset' 
        color='#d8dad9de'
        onPress={() => {
          timerReset();
        }}
      />

      <View style={styles.buttons}>
        {
          !running ? 
            ( 
              <Ionicons 
                name="play-circle-outline"
                color="green"
                size={110}
                onPress={() => setRunning(true)}       
              >
              </Ionicons>
            )
          : 
            ( 
              <Ionicons
                name='stop-circle-outline'
                color="red"
                size={110}
                onPress={() => setRunning(false)}     
              >
              </Ionicons>
            )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  counter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timer: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '200',
    fontSize: 43,
    width: 85,
    marginBottom: 100,
    marginLeft: 60,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});