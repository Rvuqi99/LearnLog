import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {LearnLogFullLogo} from '../../assets/images/IconSvg';
import {Divider, Icon} from 'react-native-elements';

const Login = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? {behavior: 'padding'} : {})}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#EDEDED'}}>
          <ScrollView>
            <View
              onStartShouldSetResponder={() => true}
              style={{
                flex: 1,
                alignItems: 'center',
                height:
                  Dimensions.get('window').height > 600
                    ? (Dimensions.get('window').height * 90) / 100
                    : Dimensions.get('window').height,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: '90%',
                }}>
                <Image
                  source={LearnLogFullLogo}
                  style={{
                    width: (Dimensions.get('window').width * 80) / 100,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{width: '80%', marginTop: 20, gap: 20}}>
                <View>
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      textAlign: 'center',
                    }}
                    placeholder="Email"
                    placeholderTextColor="#6E6E6E"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#078EC6',
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('MainMenu')}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Login
                  </Text>
                </TouchableOpacity>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
                  <Text style={{fontSize: 12, color: '#6E6E6E'}}>Or</Text>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#024E9C',
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}
                  onPress={() => navigation.navigate('MainMenu')}>
                  <Icon
                    name="logo-facebook"
                    size={20}
                    type="ionicon"
                    color="white"
                  />
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Login with Facebook
                  </Text>
                  <View style={{width: 20, height: 20}} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#6E6E6E',
                  }}
                  onPress={() => navigation.navigate('MainMenu')}>
                  <Icon
                    name="logo-google"
                    size={20}
                    type="ionicon"
                    color="black"
                  />
                  <Text style={{fontWeight: 'bold', color: '#6e6e6e'}}>
                    Login with Google
                  </Text>
                  <View style={{width: 20, height: 20}} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
