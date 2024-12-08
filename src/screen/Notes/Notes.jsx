import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {getNotesAPI} from '../../utils/allApi';
import {useIsFocused} from '@react-navigation/native';
import dayjs from 'dayjs';

const Notes = ({navigation}) => {
  const isFocused = useIsFocused();
  const [notes, setNotes] = React.useState();
  const [toggle, setToggle] = React.useState([]);

  React.useEffect(() => {
    getNotes();
  }, [isFocused]);

  const getNotes = async () => {
    const fetchApi = await getNotesAPI();
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    if (dataApi.status === 200) {
      setNotes(resultApi.notes);
    } else {
      Alert.alert('Error', 'Error encountered');
    }
  };

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
                paddingBottom: 50,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#024E9C',
                  }}>
                  Notes
                </Text>
                <TouchableOpacity
                  style={{backgroundColor: '#148A3C', borderRadius: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 5,
                      padding: 10,
                    }}>
                    <Icon name="plus" size={20} type="feather" color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Upload Note
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <TextInput
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                    flex: 0.7,
                    color: 'black',
                    flex: 0.8,
                  }}
                  placeholder="Search..."
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#078EC6',
                    borderRadius: 10,
                    padding: 10,
                    flex: 0.2,
                  }}>
                  <Icon name="search" size={20} type="ionicon" color="white" />
                </TouchableOpacity>
              </View>
              {notes ? (
                notes.map((note, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      width: '90%',
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
                        borderBottomRightRadius:
                          toggle.indexOf(index) > -1 ? 0 : 10,
                        borderBottomLeftRadius:
                          toggle.indexOf(index) > -1 ? 0 : 10,
                        padding: 10,
                      }}
                      onPress={() => {
                        if (toggle.indexOf(index) > -1) {
                          setToggle(toggle.filter(a => a !== index));
                        } else {
                          setToggle([...toggle, index]);
                        }
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          {note.tags[0]} - {note.tags[1]}
                        </Text>
                        <Icon
                          name={
                            toggle.indexOf(index) > -1 ? 'caretup' : 'caretdown'
                          }
                          size={10}
                          type="antdesign"
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                    {toggle.indexOf(index) > -1 ? (
                      <View style={{padding: 10, gap: 20}}>
                        <Text style={{color: 'black'}}>
                          <Text style={{fontWeight: 'bold'}}>
                            Published by:{' '}
                          </Text>
                          abdul_razak@gyahoo.com
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
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
                              Request Public
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                              borderRadius: 5,
                              paddingVertical: 5,
                              borderWidth: 1,
                              borderColor: '#024E9C',
                            }}
                            onPress={() =>
                              navigation.navigate('GenerateQuiz', note)
                            }>
                            <Text
                              style={{
                                color: '#024E9C',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}>
                              Generate Quiz
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {note.pastQuiz.length > 0 ? (
                          <View style={{gap: 5, marginBottom: 10}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>
                              Past Quiz
                            </Text>
                            {note.pastQuiz.map((quiz, i) => (
                              <View
                                key={i}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 10,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',
                                    flex: 1,
                                  }}>
                                  <Icon
                                    name="circle"
                                    size={8}
                                    type="material-community"
                                    color="black"
                                  />
                                  <Text>
                                    {dayjs(quiz.completedDate).format(
                                      'D MMMM YYYY, HH:mmA',
                                    )}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    backgroundColor:
                                      parseInt(quiz.score.userScore) >
                                      parseInt(quiz.score.totalQuestion) / 3
                                        ? '#148A3C'
                                        : '#E25454',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 5,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                    }}>
                                    {quiz.score.userScore} /{' '}
                                    {quiz.score.totalQuestion}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#024E9C',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 5,
                                  }}
                                  onPress={() =>
                                    navigation.navigate('ViewResult', quiz)
                                  }>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'white',
                                    }}>
                                    View Results
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        ) : (
                          <></>
                        )}
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                ))
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#7598ca" />
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Notes;
