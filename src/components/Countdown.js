import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ 
  minutes = 0.1, 
isPaused,
onProgress,
onEnd
 }) => {
  const interval = React.useRef(null);
  const countdown = () => {
    setMillies((time) => {
      if (time === 0) {
        clearInterval(interval.current);
   
        return time;
      }
      const timeLeft = time - 1000;
   
      return timeLeft;
    });
  };

  

  useEffect(()=>{
    setMillies(minutesToMillis(minutes))
  
  },[minutes ])

  useEffect((timeLeft)=>{  
       onProgress(timeLeft/minutesToMillis(minutes))
       if(millis === 0){
              onEnd();
       }
  },[millis])

 

  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [millis, setMillies] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.Text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226,0.3)',
  },
});
