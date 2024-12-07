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
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {getNotesAPI} from '../../utils/allApi';

const Notes = ({navigation}) => {
  const [notes, setNotes] = React.useState();
  const [toggle, setToggle] = React.useState([]);

  React.useEffect(() => {
    getNotes();
  }, []);

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
                            }}>
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
                        <View style={{gap: 5, marginBottom: 10}}>
                          <Text style={{color: 'black', fontWeight: 'bold'}}>
                            Past Quiz
                          </Text>
                          <View
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
                              <Text>30 Feb 2024, 15:38</Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#148A3C',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}>
                                13 / 20
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#024E9C',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                              }}
                              onPress={() => navigation.navigate('ViewResult')}>
                              <Text
                                style={{fontWeight: 'bold', color: 'white'}}>
                                View Results
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
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

const asdsad = {
  notes: [
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'e2c1bb68-0f45-4aa1-a841-0c528d0f0c4a',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '33983b9e-3f79-4a95-b597-6ca56bb44d44',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'a641715d-0d99-4c31-9a68-1673fc73bbcc',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'cc65a3c4-2948-4bc7-bcf3-d83975d949ec',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '956690c1-7590-461c-a891-a028900cb710',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: 'ac26c226-2c51-4510-9685-2cc16d2c0569',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans',
      noteid: '07eb53f8-1f46-4bbd-bc87-e682fc6596cd',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '9fddf6dd-4456-4df6-9044-ed9a259f17d5',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'cfbc198c-0476-46d4-b44a-7bfc6e980318',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '49503a0b-c129-4c6b-a5ce-348ed2737b42',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'c43eb868-ad85-4b64-85bc-cce28743e4c9',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'da988521-93c6-4266-98ae-92e6ba90936e',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'f4d4b4b8-466e-42da-9fe1-2bccd95d90a1',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'e21a63e5-eec6-4257-b109-8653a82856ca',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'bb29b4a6-7ac9-4d69-b807-797c8ade672e',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'd6dd602e-7096-4ce5-802d-300ef2d60bbd',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '79362b9a-cc70-49f4-a010-ce69ed0a40c9',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'f51ccec7-3eda-40a3-872c-e34b59d95cdb',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'faad1aee-b67e-4f05-91a8-4f8c4d0b2d89',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'e70c647c-d941-4b4d-9acb-1108a2e8ac84',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '210da5d0-f115-48ad-8056-fbbe27d9be60',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'b844bbbf-4c44-4887-84ba-f39c868025d6',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '370cf1fd-b8aa-433e-a102-19ef13ae8528',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '536e350d-0313-406d-90b4-a8875dcd2eff',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '6e721a3f-a87d-4838-8a0e-29c84a6d764b',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '5c656077-e147-4cb1-8472-dfb520fabda2',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '56874f2f-9383-4fe6-9351-a82127f80dcf',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'fc9c3ca9-4906-4d91-a54d-5f970e344ee8',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '855fee40-a9df-4fad-81af-295714f2f63d',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '010108ca-e8dd-46ba-8b20-c502d3ee39f5',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: 'eb67c219-bb74-4632-9a8b-56d05704e250',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
    {
      content:
        'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
      noteid: '33ffe46a-27e7-4fab-ba79-f4e8d5713f25',
      pastQuiz: [Array],
      tags: [Array],
      title: 'Plant',
    },
  ],
};
