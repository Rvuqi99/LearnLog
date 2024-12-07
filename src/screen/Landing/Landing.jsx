import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {LearnLogLogo} from '../../assets/images/IconSvg';
import {useIsFocused} from '@react-navigation/native';

const Landing = ({navigation}) => {
  const isFocused = useIsFocused();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeInOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({finished}) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(({finished}) => {
        fadeInOut();
      });
    });
  };

  React.useEffect(() => {
    fadeInOut();
    setTimeout(() => {
      handleLoad();
    }, 2000);
  }, [isFocused]);

  const handleLoad = async () => {
    // const token = await getTToken();

    // if (token === undefined) {
    navigation.navigate('Login');
    // } else {
    //   navigation.navigate('MainMenu');
    // }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View style={{opacity: fadeAnim}}>
        <Image
          source={LearnLogLogo}
          style={{
            width: (Dimensions.get('window').width * 40) / 100,
            height: (Dimensions.get('window').width * 40) / 100,
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Landing;
