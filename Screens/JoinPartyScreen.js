import React, { useState } from "react";
import Banner from "../Components/PageSections/Banner";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import StandardButton from "../Components/UI/StandardButton";
import Colors from "../Constants/Colors";
import StandardInput from "../Components/UI/StandardInput";
import PartyService from "../Services/PartyService";
import GuestService from "../Services/GuestService";
import SocketContext from "../Context/SocketContext";

export default JoinPartyScreen = ({ navigation }) => {
  const [guestName, setguestName] = useState('');
  const [partyCode, setpartyCode] = useState('');
  const [namePlaceholder, setnamePlaceholder] = useState('Enter Name')
  const [partyCodePlaceholder, setpartyCodePlaceholder] = useState('Enter Party Code')
  const socket = useContext(SocketContext);
  
  const joinParty = async () => {
    const response = await PartyService.joinParty(
      partyCode,
      guestName,
      GuestService.guestNotificationToken
    )

    if(response){
      PartyService.partyId = partyCode;
      GuestService.guestId = response.newGuest._id;
      socket.emit("join-room", partyCode);
      navigation.navigate("GuestScreen");
    } else {
      Alert.alert("Party does not exist");
    }
    
  }
  
  const handleAction = () => {

    if(guestName && partyCode){

      joinParty();

    } else {

      if(guestName == ''){
        setnamePlaceholder("Missing name!");
      }
      if(partyCode == ''){
        setpartyCodePlaceholder("Missing party code!");
      }
    }

    
  };
  return (
    <View style={styles.container}>
      <Banner title="Join Party" isBack={true} />
      <Image
        source={require("../assets/ShakeUsLogo.png")}
        style={styles.logo}
      />
      <View style={styles.lowerContainer}>
        <StandardInput placeholder={namePlaceholder}
         maxLength={20}
         onChangeText={text => setguestName(text)} 
         />
        <StandardInput placeholder={partyCodePlaceholder}
         maxLength={9}
         onChangeText={text => setpartyCode(text)} 
         />
        <StandardButton
          style={styles.button}
          title="Join Party"
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
