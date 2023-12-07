import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  SharedElement,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';

const SPACING = 15;
const POST_GUTTER_WIDTH = 2;

const DetailScreen = ({route, navigation}: any) => {
  const dimensions = useWindowDimensions();
  const imageWidth = dimensions.width / 2 - POST_GUTTER_WIDTH;
  const {data} = route.params;
  const safeInsets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        navigation.goBack();
      },
    }),
  ).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          flex: 1,
        }}
        {...panResponder.panHandlers}>
        <Animated.View
          style={{
            opacity,
            position: 'absolute',
            top: safeInsets.top + SPACING,
            left: safeInsets.left + SPACING,
            right: safeInsets.right + SPACING,
            zIndex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../assets/icons/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </Animated.View>

        <SharedElement id={JSON.stringify(data?.id)}>
          <Image source={{uri: data?.thumbnail}} style={styles.postImage} />
        </SharedElement>

        <View style={styles.postDetails}>
          <Text style={styles.postTitle}>{data?.title}</Text>

          <Text style={styles.postPrice}>€{data?.price}</Text>
          <Animated.Text
            style={{
              opacity,
              fontSize: 17,
            }}>
            {data?.description}
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  postImage: {
    height: 300,
    width: '100%',
  },
  postDetails: {
    paddingVertical: 10,
    paddingHorizontal: SPACING,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 24,
  },
  postContactButton: {
    marginVertical: SPACING,
  },
  closeBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
