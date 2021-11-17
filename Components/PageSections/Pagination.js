import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import activityPackages from "../../Constants/Packages";
import Colors from "../../Constants/Colors";

export default function pagination({ index, length }) {
  return (
    <View style={[{}]}>
      <View style={styles.activityCarouselDots}>
        <Pagination
          containerStyle={{}}
          dotStyle={{
            backgroundColor: Colors.primary,
            width: 10,
            height: 10,
            borderRadius: 25,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.7}
          activeDotIndex={index}
          dotsLength={length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityCarouselDots: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});
