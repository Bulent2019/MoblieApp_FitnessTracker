import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import TimerInfo from './TimerInfo';
import moment from 'moment';

export default function Map({navigation}) {

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    
    const [steps, setSteps] = useState({
        time: 0,
        distance: 0,
    })

    const [distance, setDistance] = useState(0);
    const [speed, setSpeed] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [tracking, setTracking] = useState(false);

    const home = {
        latitude: 60.16512483900363,
        longitude: 24.733249045281166,
    }

    const school = {
        latitude: 60.2017,
        longitude: 24.9338,
    }

    const a = {
        latitude: 60.763504639512574,
        longitude: 24.863504639512574,
    }

    const b = {
        latitude: 60.8001,
        longitude: 24.9963,
    }

    const c = {
        latitude: 60.793504639512574,
        longitude: 24.793504639512574,
    }

    const d = {
        latitude: 60.823504639512574,
        longitude: 24.833504639512574,
    }

    const e = {
        latitude: 60.853504639512574,
        longitude: 24.863504639512574,
    }

    const f = {
        latitude: 60.893504639512574,
        longitude: 24.903504639512574,
    }
    
    let positio = [];
    let id = 0;

    useEffect(() => {
        getLocation();
    }, [])
    
    useEffect(() => {
        positio = [];
        if(!tracking) {
            setInterval(() => {
                updateLocation();
            }, 5000)
        } 
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
            console.log('..history: '+ mydate);
        }
    };

    const updateLocation = async () => {
        const options = {enableHighAccuracy: true, distanceInterval: 2};
        await Location.watchPositionAsync(options, positionChange);
    }
    
    const positionChange = (position) => {
        setSpeed(position.coords.speed);

        positio.push([position.coords.latitude, position.coords.longitude]);
        console.log('### ' + positio.length + ' ###' );
        console.log('\ttimestamp\t: ' + JSON.stringify(position.timestamp));
        console.log('\tspeed    \t: ' + JSON.stringify(position.coords.speed));
        console.log('\tlongitude\t: ' + JSON.stringify(position.coords.longitude));
        console.log('\tlatitude \t: ' + JSON.stringify(position.coords.latitude));
    }
    
    // positio.map((items, key) => {
    //     console.log('here..............');
    //     console.log(key={key}, items={items})
    // })

    return ( 
        <View style = {styles.container}>

            {
                (loading) ?
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
                                <Polyline coordinates={[home, school]}
                                    strokeWidth={6} 
                                    strokeColor='#f8a63f'
                                />
                                        {/* [[lat,lng],[lat,lng],[lat,lng]] */}
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
    infofield: {
        flex: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#0d0d0d',
        alignItems: 'flex-start',
    },
});