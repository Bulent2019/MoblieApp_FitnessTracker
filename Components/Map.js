import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import TimerInfo from './TimerInfo';
import moment from 'moment';
import Calories from './Calories';
import Steps from './Steps';

// TODO: updating the location per second



export default function Map() {

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [locationHistory, setLocationHistory] = useState({
        coordinate: {
            latitude: 0,
            longitude: 0,
            
        }
    });

    const [history, setHistory] = useState([]);

    const { coordinate }= locationHistory;

    const [steps, setSteps] = useState({
        time: 0,
        distance: 0,
    })

    const [posi, setPosi] = useState([{
        timestamp: 0,
        coords: {
            latitude: 0,
            longitude: 0,
            accuracy: 0,
        }
        
    }])

    const [allPositions, setAllPositions] = useState([]);

    const [updatePosition, setUpdatePosition] = useState([]);
    const [distance, setDistance] = useState(0);
    const [speed, setSpeed] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [tracking, setTracking] = useState(true);
    
    const keyList = [];
    
    const latlng = [];
    let positio = [];
    const trainingDates = [];
    
    let id = 0;

    // useEffect(async () => {
    //     const options = {enableHIghAccuracy: true, timeInterval: 1000,distanceInterval: 1};
    //     let listener = await Location.watchPositionAsync(options, onPositionChange);
    //     setUpdatePosition([...listener, {listener}]);

    //     return listener.remove();
    // }, [])

    useEffect(() => {
        positio = [];
        getLocation();
    }, [])
    
    useEffect(() => {
        positio = [];
        if(tracking) {
            setInterval(() => {
                updateLocation();
            }, 5000)
        }
        
        
        // if(tracking) {
            // id = setInterval(() => {
            //     setLocationHistory(locationHistory =>
            //         locationHistory
            //     )
            // }, 1000)
            // return () =>{
            //     () =>  clearImmediate(id);
            //     function cleanup(){
            //         getLocation();
            //         updateLocation();
            //     };
            // }
        // } else {
        //     return undefined;
        // }
    }, [updateLocation]);
    
    const getLocation = async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        } else {
            let {coords: {latitude, longitude}, timestamp} = await Location.getCurrentPositionAsync({});
            setLoading(false);
            setLocation({
                latitude,
                longitude,
            });
            let mydate = moment(timestamp).format('YYYY-MM-DD ');
            setSteps({time: mydate, distance: 100});
            // setLocationHistory([{key: mydate, lat: loc.coords.latitude, lng: loc.coords.longitude}]);
            keyList.push(locationHistory.key);
            // setSpeed(loc.coords.speed);
            
            // console.log('\n\nlocation: ' + JSON.stringify(loc)); //prints everthing in a string fromat
            console.log('..history: '+ mydate);
            trainingDates.push(...mydate);
        }
    };


    const updateLocation = async () => {
        const options = {enableHighAccuracy: true, distanceInterval: 2};
        const movment = await Location.watchPositionAsync(options, positionChange);
    }

    const positionChange = (position) => {
        // setUpdatePosition(...updatePosition [position])
        // setAllPositions({...allPositions [ position]})
        // long.push(position.coords.longitude);
        // lat.push(position.coords.latitude);
        setSpeed(position.coords.speed);
        // setHistory([...history,position.coords.latitude, position.coords.longitude]);
        positio.push([position.coords.latitude, position.coords.longitude]);
        console.log('--here--' + JSON.stringify(position));
        console.log('###here' + positio.length);
        
    }
    
    console.log('----' + trainingDates);
    positio.map((items, key) => {
        console.log(key={key}, items={items})
    })

    return ( 
        <View style = {styles.container}>

            {(loading) ?
                (
                    <View style={styles.loading}>
                        <Text style={{fontSize: 24}}>Loading...</Text>
                    </View>
                )
                :
                (
                    <MapView style = {styles.map}
                        provider='google'
                        maxZoomLevel={25}
                        accuracy={1}
                        region = {{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0100,
                            longitudeDelta: 0.0100,
                        }} 
                    >
                        <Polyline coordinates={positio.map(item => item)} strokeWidth={10} strokeColor='#f8a63f'/>

                        <Marker
                            coordinate = { 
                                {
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }
                            }
                        /> 
                    </MapView>
                )
            }
        
            <View style={styles.infofield}>
                <Text style={{fontSize: 16, color: 'white', marginLeft: 10, marginTop: 10, justifyContent:'space-between'}}>Distance: {distance} m          Speed: {speed.toFixed(2)} m/s</Text>
                <Text style={{marginTop: 30, fontSize: 16, color: 'white', marginLeft: 10}}>Time</Text>
                <TimerInfo />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 6,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // runcontainer: {
    //     flex: 1,
    // },
    // runmap: {
    //     flex: 1,
    // },
    infofield: {
        flex: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#0d0d0d',
        alignItems: 'flex-start',
    },
});