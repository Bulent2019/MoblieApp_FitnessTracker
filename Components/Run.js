import React, { useState, useEffect, View, StyleSheet } from 'react';

const Running = async () => {
    const [running, setRunning] = useState({
        distance: 0,
        latitude: 10.00,
        longitude: 20.00,
    })
    const text = 'Tryout!';

    useEffect(() => {
        updateLocation();
    }, [])

    const updateLocation =  async () => {
        const options = {enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1};
        const updating = await Location.watchPositionAsync(options, positionChange)
        console.log('>>>>here..1 ' + updating);
    }

    const positionChange = (position) => {
        console.log('>>>>here..2' + {position});
    }

    return(
        <View style={styles.runcontainer}>
            <MapView provider="google" style={styles.runmap}/>
        </View>
    )
}


export default function Run() {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [locationHistory, setLocationHistory] = useState([{
        key: 0,
        lat: 0,
        lng: 0,
    }]);

    const [steps, setSteps] = useState({
        time: 0,
        distance: 0,
    })

    const [updatePosition, setUpdatePosition] = useState([]);
    const [distance, setDistance] = useState(0);
    const [speed, setSpeed] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [tracking, setTracking] = useState(true);
    
    const keyList = [];
    let id = 0;

    useEffect(() => {
        
        if(tracking) {
            getLocation();
            id = setInterval(() => {
                setLocationHistory(locationHistory =>
                    locationHistory
                )
            }, 1000)
            return () =>{
                () =>  clearImmediate(id);
                function cleanup(){
                    getLocation();
                };
            }
        } else {
            return undefined;
        }
    }, []);

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
            let mydate = moment(timestamp).format('Do MMM YY HH:mm');
            setSteps({time: mydate, distance: 100});
            // setLocationHistory([{key: mydate, lat: loc.coords.latitude, lng: loc.coords.longitude}]);
            keyList.push(locationHistory.key);
            // setSpeed(loc.coords.speed);
            
            // console.log('\n\nlocation: ' + JSON.stringify(loc)); //prints everthing in a string fromat
            console.log('\nhere..location: '+ JSON.stringify(location));
            console.log('here..history: '+ JSON.stringify(locationHistory));
            console.log('here..history: '+ speed);
            console.log('here..history: '+ mydate);
            console.log('here..steps:' + steps.time + ' ' + steps.distance);
        }
        console.log('XXXX: ' + JSON.stringify(locationHistory));

        return (
                <Steps title={JSON.stringify(locationHistory)}/>
        )
    };



    return(
        <View style={styles.container}>
            
            {(loading) ?
                (
                    <View style={styles.loading}>
                        <Text style={{fontSize: 24}}>Loading...</Text>
                    </View>
                )
                :
                (
                    <MapView style = {styles.map}
                        region = {
                            {
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0100,
                                longitudeDelta: 0.0100,
                            }
                        } 
                    >
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
        </View>
    )
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
});