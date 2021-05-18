import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default function MyCalendar() {
    const settings = {color: '#3ea6ff', textColor: '#fff'};
    let currentDate = moment().format('YYYY-MM-DD');

    const trainingSettings = {color: '#ffaa00', textColor: '#000'};
    const trainingsDay = '2021-05-10';

    return ( 
        <View style = {styles.container}>
            <Calendar
                style={styles.calendar, {height: 400}}
                onDayPress={(day) => {console.log('selected day', day)}}
                markingType={'period'}
                markedDates={{
                    [currentDate] : settings,
                    [trainingsDay] : trainingSettings,
                }}
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