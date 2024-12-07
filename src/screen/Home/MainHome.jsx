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
import {Divider} from 'react-native-elements';

const MainHome = () => {
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
                Note-based Question Generator
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 10,
                  padding: 20,
                  gap: 20,
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#078EC6',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: '#078EC6',
                      textAlign: 'center',
                      fontWeight: 500,
                    }}>
                    Upload Notes
                  </Text>
                </TouchableOpacity>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    And/Or
                  </Text>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
                </View>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                    minHeight: 100,
                  }}
                  placeholder="Type your chapter/topic summary here...."
                  placeholderTextColor="black"
                  multiline
                />
                <Divider
                  style={{flex: 1, borderColor: '#6E6E6E', marginVertical: 10}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{flex: 0.3}}>Title: </Text>
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
                  <Text style={{flex: 0.3}}>Chapter/Topic: </Text>
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
                  <Text style={{flex: 0.3}}>Total Questions: </Text>
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
                  Generate Questions
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  padding: 20,
                  gap: 20,
                }}>
                <Text
                  style={{color: '#024E9C', fontSize: 20, fontWeight: 'bold'}}>
                  Quiz: 15 questions
                </Text>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Text style={{color: 'black', fontWeight: 500}}>1.</Text>
                  <View style={{gap: 5, flex: 1}}>
                    <Text style={{color: 'black', fontWeight: 500}}>
                      What is the name of my pet?
                    </Text>
                    <Text style={{color: '#6E6E6E'}}>Answer:</Text>
                    <TextInput
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderColor: '#6E6E6E',
                        borderWidth: 1,
                        flex: 0.7,
                        color: 'black',
                      }}
                    />
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

export default MainHome;
