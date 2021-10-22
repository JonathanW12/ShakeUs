import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";

export default HostPartyScreen = ({ navigation }) => {
  const handleActionStartParty = () => {
    navigation.navigate("MainScreen");
  };
  return (
    <View style={styles.container}>
      <Banner
        title="Host Party"
        iconName="arrow-left"
        onIconPress={() => {
          navigation.navigate("MainScreen");
        }}
      />
      <View style={styles.contentWrapper} >
        <Text style={styles.header1}>Select Activity Pack</Text>
        <View style={[styles.activityWrapper,]}>
          <View style={[styles.activityCarousel,]}>
            <View style={[styles.whiteBorderBottom, ]}>
              <Text style={styles.activityHeader}>The Wild West</Text>
              <Text style={styles.activityCount}>18 Activites</Text>
            </View>
            <View style={[styles.whiteBorderBottom]}>
              <Text style={styles.activityPackDescription}>Get to know your fellow cowboys and cowgirls in this western themed activity pack. Yeehaw!</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <Pressable style={styles.button} onPress={() => {console.log('Button Pressed!')}}>
                <Text style={styles.text}>Customize Pack</Text>
              </Pressable>
            </View>

          </View>
          <View style={styles.activityCarouselDots}>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
          </View>
        </View>
        <View style={styles.timeWrapper}>

          <View style={styles.timeBox}>
            <View>
              <Text style={styles.timeBoxHeader}>Start Time</Text>
            </View>
            <View style={styles.timeBoxContent}>
              <View>
                <Text style={styles.timeBoxNumberSquare}>18</Text>
              </View>
              <View>
                <Text style={styles.dotsBetweenTime}>:</Text>
              </View>
              <View>
                <Text style={styles.timeBoxNumberSquare}>30</Text>
              </View>
            </View>
          </View>

          <View style={styles.timeBox}>
            <View>
              <Text style={styles.timeBoxHeader}>Finish Time</Text>
            </View>
            <View style={styles.timeBoxContent}>
              <View>
                <Text style={styles.timeBoxNumberSquare}>03</Text>
              </View>
              <View>
                <Text style={styles.dotsBetweenTime}>:</Text>
              </View>
              <View>
                <Text style={styles.timeBoxNumberSquare}>00</Text>
              </View>
            </View>
          </View>
          
        </View>
        <View style={{alignItems:"center", width: '100%'}}>
          <StandardButton
          textStyle={styles.buttonTextStyle}
          style={{ ...styles.button, backgroundColor: Colors.tertiary }}
          title="Start Party"
          action={handleActionStartParty}
        />
        </View>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.secondary,
  },
  header1:{
    fontSize:20,
    color:'#fff',
    marginTop: 20,
    marginBottom: 20,   
  },
  contentWrapper:{
    flex:1,
    alignItems: "center",
  },
  activityWrapper:{
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
    minHeight: 300,
    
  },
  activityCarousel:{
    width: '90%',
    height: 260,
    backgroundColor: Colors.primary,
    padding: 15,
    flexWrap: "wrap",
  },

  border:{
    borderColor: '#fff',
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
  },

  activityCarouselDots:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: '50%',
  },
  whiteBorderBottom: {
    borderBottomWidth:1,
    borderColor:'#fff',
  },
  whiteTextColor:{
    color: '#fff',
    textAlign: "center",
  },
  activityHeader:{
    color: '#fff',
    fontWeight: '700',
    fontSize:24,
    width: '100%',
    textAlign: "center",
  },
  activityCount:{
    fontSize: 20,
    color: '#fff',
    textAlign: "center",
    marginBottom:10,
  },
  activityPackDescription:{
    color: '#fff',
    marginTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    textAlign: "center",
  },  
  centerText:{
    alignItems: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.secondary,
    width: 200,
    marginTop: 20,
  },
  buttonStartParty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.tertiary,
    width: '90%',
    marginTop: 20,
    height: 70,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  // CLOCK 
  timeWrapper:{
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: '90%',

  },
  timeBox:{
    width: '45%',
    backgroundColor: Colors.primaryDark,
    borderRadius: 5,
  },

  timeBoxHeader:{
    color: '#fff',
    fontWeight: '700',
    textAlign: "center",
    padding: 5,
  },
  timeBoxContent:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
  },
  timeBoxNumberSquare:{
    color: Colors.secondary,
    fontSize: 22,
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft:10,
    paddingRight: 10,
    borderRadius:2,
  },
  dotsBetweenTime:{
    fontWeight: '700',
    color: '#fff',
    fontSize: 22,

  }


});
