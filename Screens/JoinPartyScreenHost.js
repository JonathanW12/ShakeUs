import React, {useState} from "react";
import Banner from "../Components/Banner";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";
import StandardInput from "../Components/StandardInput";
import GuestService from "../Components/Services/GuestService";

export default JoinPartyScreenHost = ({ navigation }) => {
  const [hostName, sethostName] = React.useState('');
  const [placeHolderText, setplaceHolderText] = useState('Enter Name');
  const [placeHolderColor, setplaceHolderColor] = useState("#999");
  const handleAction = () => {
    if(hostName != ''){
      GuestService.hostName = hostName;
      navigation.navigate("HostPartyScreen");
    } else {
      setplaceHolderText("Name is missing!");
    };

    
  };
  return (
    <View style={styles.container}>
      <Banner title="Join Party" isBack={true} />
      <Image
        source={require("../assets/ShakeUsLogo.png")}
        style={styles.logo}
      />
      <View style={styles.lowerContainer}>
        <StandardInput 
        placeholder={placeHolderText}
        maxLength={20} 
        onChangeText={text => sethostName(text)
        }
        />

        <StandardButton
          style={styles.button}
          title="Register as Host"
          action={handleAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  button: {
    width: "90%",
    backgroundColor: Colors.tertiary,
  },
  logo: {
    width: "60%",
    //Do not change height.
    height: Dimensions.get("screen").width * 0.6,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "10%",
  },
  lowerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
