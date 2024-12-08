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
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Divider, Icon} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {trackTopicAPI} from '../../utils/allApi';
import {getTEmail} from '../../../TokenService';

const Track = () => {
  const isFocused = useIsFocused();
  const [subject, setSubject] = React.useState();
  const [question, setQuestion] = React.useState();
  const [topic, setTopic] = React.useState();
  const [notes, setNotes] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [toggle, setToggle] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState();

  React.useEffect(() => {
    getUserEmail();
  }, [isFocused]);

  const getUserEmail = async () => {
    const emel = await getTEmail();

    setUserEmail(emel);
  };

  const validate = () => {
    if (
      question !== null &&
      question !== undefined &&
      question !== '' &&
      subject !== null &&
      subject !== undefined &&
      subject !== ''
    ) {
      trackQuestion();
    } else {
      Alert.alert('Error', 'Fill in all required fields!');
    }
  };

  const trackQuestion = async () => {
    setIsLoading(true);

    const fetchApi = await trackTopicAPI(question, subject);
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    if (dataApi.status === 200) {
      console.log(resultApi);
      setTopic(resultApi.topicResult);
      setNotes(resultApi.trackedNotes);

      if (
        resultApi.topicResult !== null &&
        resultApi.topicResult !== undefined &&
        resultApi.topicResult !== '' &&
        resultApi.topicResult !== null &&
        resultApi.topicResult !== undefined &&
        resultApi.topicResult !== ''
      ) {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Error', 'Error encountered');
      setIsLoading(false);
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
                  <Text style={{flex: 0.3}}>Subject* : </Text>
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
                    value={subject}
                    onChangeText={text => setSubject(text)}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{flex: 0.3}}>Question / Search Topic* : </Text>
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
                    value={question}
                    onChangeText={text => setQuestion(text)}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
                  <Text style={{color: 'black', fontWeight: 'bold'}}>Or</Text>
                  <Divider style={{flex: 1, borderColor: '#6E6E6E'}} />
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
                }}
                disabled={isLoading}
                onPress={() => validate()}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Track
                  </Text>
                )}
              </TouchableOpacity>
              {topic && notes && (
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    padding: 20,
                    gap: 20,
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#024E9C',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Results
                  </Text>
                  <View style={{gap: 5}}>
                    <Text style={{color: 'black'}}>
                      Subject:{'     '}
                      <Text style={{fontWeight: 'bold'}}>{subject}</Text>
                    </Text>
                    <Text style={{color: 'black'}}>
                      Chapter/Topic:{'     '}
                      <Text style={{fontWeight: 'bold'}}>{topic}</Text>
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#024E9C',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    List of notes:
                  </Text>
                  {notes.map((note, index) => (
                    <View
                      key={index}
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
                            {note.title}
                          </Text>
                          <Icon
                            name={
                              toggle.indexOf(index) > -1
                                ? 'caretup'
                                : 'caretdown'
                            }
                            size={10}
                            type="antdesign"
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                      {toggle.indexOf(index) > -1 && (
                        <View style={{padding: 10, gap: 20}}>
                          <Text style={{color: 'black'}}>
                            <Text style={{fontWeight: 'bold'}}>
                              Published by:{' '}
                            </Text>
                            {note.publishedBy}
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
                            {note.publishedBy !== userEmail && (
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
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Track;

const sadas = {
  subject: 'Science',
  topicResult: 'Plants',
  trackedNotes: [
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'e2c1bb68-0f45-4aa1-a841-0c528d0f0c4a',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '33983b9e-3f79-4a95-b597-6ca56bb44d44',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'a641715d-0d99-4c31-9a68-1673fc73bbcc',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'cc65a3c4-2948-4bc7-bcf3-d83975d949ec',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '956690c1-7590-461c-a891-a028900cb710',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'ac26c226-2c51-4510-9685-2cc16d2c0569',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '07eb53f8-1f46-4bbd-bc87-e682fc6596cd',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '9fddf6dd-4456-4df6-9044-ed9a259f17d5',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'cfbc198c-0476-46d4-b44a-7bfc6e980318',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '49503a0b-c129-4c6b-a5ce-348ed2737b42',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'c43eb868-ad85-4b64-85bc-cce28743e4c9',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'da988521-93c6-4266-98ae-92e6ba90936e',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'f4d4b4b8-466e-42da-9fe1-2bccd95d90a1',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'e21a63e5-eec6-4257-b109-8653a82856ca',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'bb29b4a6-7ac9-4d69-b807-797c8ade672e',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'd6dd602e-7096-4ce5-802d-300ef2d60bbd',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '79362b9a-cc70-49f4-a010-ce69ed0a40c9',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'f51ccec7-3eda-40a3-872c-e34b59d95cdb',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'faad1aee-b67e-4f05-91a8-4f8c4d0b2d89',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'e70c647c-d941-4b4d-9acb-1108a2e8ac84',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '210da5d0-f115-48ad-8056-fbbe27d9be60',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'b844bbbf-4c44-4887-84ba-f39c868025d6',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '370cf1fd-b8aa-433e-a102-19ef13ae8528',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '536e350d-0313-406d-90b4-a8875dcd2eff',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '6e721a3f-a87d-4838-8a0e-29c84a6d764b',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '5c656077-e147-4cb1-8472-dfb520fabda2',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '56874f2f-9383-4fe6-9351-a82127f80dcf',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'fc9c3ca9-4906-4d91-a54d-5f970e344ee8',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '855fee40-a9df-4fad-81af-295714f2f63d',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '010108ca-e8dd-46ba-8b20-c502d3ee39f5',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'eb67c219-bb74-4632-9a8b-56d05704e250',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '33ffe46a-27e7-4fab-ba79-f4e8d5713f25',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'a1763b42-a95f-4f78-b22f-b3355cace929',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '4e5d0b3d-2e86-4c93-95c8-a1a358ae152c',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'e1acb0a7-d869-40be-8323-e325bbc3a154',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '2310e702-9cb1-4d5d-b7e8-4f6ea295b37d',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '7f280e8e-6efd-405f-85ba-4260c2573142',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'a45e8d49-0682-4ce8-8b64-626e550bbd0c',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'd4c7be0d-440d-487b-81f8-b5146b4a8dfb',
      publishedBy: 'test@gmail.com',
      title: 'Plant',
    },
  ],
};
