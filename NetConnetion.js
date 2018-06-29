
import {NetInfo,Alert,BackHandler} from 'react-native';

export function NetCon(){
    NetInfo.isConnected.fetch().then(isConnected => {
        //alert('First, is ' + (isConnected ? 'online' : 'offline'));
        if (isConnected == false) {
            Alert.alert("No conection", "Please check the internet connectivity !!",
                [
                    { text: 'OK', onPress: () => BackHandler.exitApp() }
                ]
            )
        }else{
            return true;
        } 
    });
}


