import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import TimerInfo from './TimerInfo';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function MyCalendar({}) {

    const [trainingstime, setTreiningstime] = useState('2021-05-16');
    
   
    const settings = {color: '#3ea6ff', textColor: 'white'};

    return ( 
        <View style = {styles.container}>
            <Text>Calendar</Text>
            <Calendar
                style={styles.calendar, {height: 400}}
                onDayPress={(day) => {console.log('selected day', day)}}
                markingType={'period'}
                markedDates={{'2021-05-16' : settings}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
    },
    calendar: {
        flex: 1,
        
    }
});