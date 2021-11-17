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

export default JoinPartyScreen = ({ navigation }) => {
  const [guestName, setguestName] = useState('');
  const [partyCode, setpartyCode] = useState('');
  const [namePlaceholder, setnamePlaceholder] = useState('Enter Name')
  const [partyCodePlaceholder, setpartyCodePlaceholder] = useState('Enter Party Code')
  
  const onSucces = (res) => {
    //console.log(res);
    GuestService.guestId = res.newGuest._id;
    GuestService.guestList = res.guests;
    PartyService.partyId = partyCode;

    console.log(partyCode);

    if(GuestService.guestId != null && GuestService.guestList != null){
      navigation.navigate("GuestScreen");
    } else {
      Alert.alert("Something went wrong, please try again");
    }
    
  }

  async function joinParty(){
    const response = await PartyService.joinParty(
      partyCode,
      guestName,
      GuestService.guestNotificationToken
    )
    const result = await response.json()
    .then(res => onSucces(res))
    .catch(err => Alert.alert("Party does not exist"));
    
  }
  
  const handleAction = () => {
    if(guestName != '' && partyCode != ''){
      //Do magic to join party
      console.log(partyCode);
      console.log(guestName);
      console.log(GuestService.guestNotificationToken);
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
