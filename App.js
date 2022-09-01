import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { Button, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View, } from "react-native"
import { WebView } from 'react-native-webview';
import { Camera, CameraType } from "expo-camera";

const GOOGLE = "https://dev.table-extractor.sense-23.com/"



const requestCameraPermission = async () => {
  try {
    const granted = await Camera.requestCameraPermissionsAsync();
    if (granted) {
      console.log("You can use the camera");
      console.log(granted)
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <View style={{width: "100%", height: "100%",}}>
        {hasPermission ? <WebView source={{ uri: GOOGLE }} 
        onLoad={console.log("Loaded")} 
        allowInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        useWebKit
        originWhitelist={['*']}
        /> : <Text> No access to camera</Text>}
        </View>
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
