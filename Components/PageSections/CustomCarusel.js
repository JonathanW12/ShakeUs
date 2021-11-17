import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import Colors from '../../Constants/Colors';
import Carousel from 'react-native-snap-carousel';
import Pagination from './Pagination';
import ActivityPackService from '../../Services/ActivityPackService';

export default CustomCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [personalActivityPackIds, setPersonalActivityPackIds] = useState([
    "b40bd330-98e9-429e-871c-7064ae410b54",
  ]);
  const ref = useRef(null);

  useEffect(() => {
    let fetchedPacks = [];
    ActivityPackService.getActivityPackTemplates().then((activityPacks) => {
      fetchedPacks.push(...activityPacks);
      ActivityPackService.currentPack = fetchedPacks[0];
    });
    personalActivityPackIds.forEach(async (id) => {
      await ActivityPackService.getActivityPack(id)
        .then((activityPack) => {
          setCarouselItems([...fetchedPacks, activityPack]);
        })
        .catch((error) => {
          setCarouselItems([...fetchedPacks]);
        });
      });
    }, []);
  
  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={[styles.activityCarousel]}>
        <View style={{...styles.whiteBorderBottom,}}>
          <Text style={styles.activityHeader}>{item.title}</Text>
          <Text style={styles.activityCount}>
            {item.activities.length} Activites
          </Text>
        </View>
        <View style={{marginBottom: 20, }}>
          <Text style={styles.activityPackDescription}>{item.description}</Text>
        </View>
      </View>
    ),
    []
  );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.secondary,
                paddingTop: 5,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={370}
                    itemWidth={340}
                    renderItem={renderItem}
                    onSnapToItem={(index) => {
                        setActiveIndex(index);

                        ActivityPackService.currentPack = carouselItems[index];
                    }}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Pagination length={carouselItems.length} index={activeIndex} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  activityWrapper: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    //minHeight: 250,
  },
  activityCarousel: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary,
    padding: 10,
    //justifyContent: "center",
    borderRadius: 10,
  },
  activityCarouselDots: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
  whiteBorderBottom: {
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  whiteTextColor: {
    color: "#fff",
    textAlign: "center",
  },
  activityHeader: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
  },
  activityCount: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  activityPackDescription: {
    color: "#fff",
    marginTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    textAlign: "center",
    minHeight: 150,
  },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        //backgroundColor: Colors.secondary,
        width: 200,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
