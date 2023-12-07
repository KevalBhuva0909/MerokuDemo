import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  Pressable,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useRef} from 'react';
import {Data} from '../constants/Data';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SharedElement,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';

const SPACING = 15;
const POST_GUTTER_WIDTH = 2;

const HomeScreen = ({navigation}: any) => {
  const dimensions = useWindowDimensions();
  const imageWidth = dimensions.width / 2 - POST_GUTTER_WIDTH;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        // You can handle release logic here
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.listHeader}>Products</Text>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={styles.posts}>
          {Data.map((data, index) => {
            return (
              <Pressable
                key={data?.id}
                onPress={() =>
                  navigation.push('DetailScreen', {
                    data,
                  })
                }
                style={{
                  width: imageWidth,
                }}>
                {/* <Animated.View
                  style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                    width: imageWidth,
                  }}
                  {...panResponder.panHandlers}> */}
                <SharedElement id={JSON.stringify(data?.id)}>
                  <Image
                    source={{uri: data?.thumbnail}}
                    style={{
                      height: 180,
                      width: imageWidth,
                      marginRight: index % 2 === 1 ? 0 : POST_GUTTER_WIDTH,
                      marginLeft: index % 2 === 1 ? POST_GUTTER_WIDTH : 0,
                    }}
                  />
                </SharedElement>
                <View style={styles.postTexts}>
                  <Text numberOfLines={1} style={styles.postHeader}>
                    €{data?.price} · {data?.title}
                  </Text>

                  <Text numberOfLines={1} style={styles.postDescription}>
                    {data?.description}
                  </Text>
                </View>
                {/* </Animated.View> */}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {flex: 1},
  listHeader: {
    fontSize: 28,
    fontWeight: '800',
    margin: SPACING,
  },
  posts: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postTexts: {
    margin: 10,
    marginBottom: 15,
  },
  postHeader: {
    fontWeight: '600',
  },
  postDescription: {
    color: 'gray',
  },
});
