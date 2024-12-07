import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {Divider, Icon} from 'react-native-elements';
const Track = () => {
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? {behavior: 'padding'} : {})}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#EDEDED'}}>
          <ScrollView style={{flex: 1}}>
            <View
              onStartShouldSetResponder={() => true}
              style={{
                paddingTop: 20,
                gap: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#024E9C',
                }}>
                Chapter/Topic Tracker
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 10,
                  padding: 20,
                  gap: 20,
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{flex: 0.3}}>Subject: </Text>
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderColor: '#BDBDBD',
                      borderWidth: 1,
                      flex: 0.7,
                      color: 'black',
                    }}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{flex: 0.3}}>Question / Search Topic: </Text>
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderColor: '#BDBDBD',
                      borderWidth: 1,
                      flex: 0.7,
                      color: 'black',
                      minHeight: 100,
                    }}
                    multiline
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#024E9C',
                    paddingVertical: 10,
                    elevation: 2,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: '#024E9C',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Scan Question / Text
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  width: '85%',
                  backgroundColor: '#148A3C',
                  elevation: 2,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Track
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  padding: 20,
                  gap: 20,
                  height: '100%',
                }}>
                <Text
                  style={{color: '#024E9C', fontSize: 20, fontWeight: 'bold'}}>
                  Results
                </Text>
                <View style={{gap: 5}}>
                  <Text style={{color: 'black'}}>
                    Subject:{'     '}
                    <Text style={{fontWeight: 'bold'}}>Science</Text>
                  </Text>
                  <Text style={{color: 'black'}}>
                    Chapter/Topic:{'     '}
                    <Text style={{fontWeight: 'bold'}}>Plants</Text>
                  </Text>
                </View>
                <Text
                  style={{color: '#024E9C', fontWeight: 'bold', fontSize: 16}}>
                  List of notes:
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#078EC690',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>
                        English - Chapter 1 : Introduction to Grammar (Primary
                        1)
                      </Text>
                      <Icon
                        name="caretup"
                        size={10}
                        type="antdesign"
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{padding: 10, gap: 20}}>
                    <Text style={{color: 'black'}}>
                      <Text style={{fontWeight: 'bold'}}>Published by: </Text>
                      abdul_razak@gyahoo.com
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 10,
                        marginBottom: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#148A3C',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          borderRadius: 5,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          View
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#E7C151',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          borderRadius: 5,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          Add to Note
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Track;
