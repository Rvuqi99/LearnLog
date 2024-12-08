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
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';
import {
  generateQuestion,
  insertNoteApi,
  submitAnswer,
} from '../../utils/allApi';
import {useIsFocused} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const [title, setTitle] = React.useState('Plant');
  const [subject, setSubject] = React.useState('Science');
  const [topic, setTopic] = React.useState('Topic');
  const [totalQues, setTotalQues] = React.useState('5');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);
  const [content, setContent] = React.useState(
    'Plants are living organisms that play a crucial role in sustaining life on Earth. They belong to the kingdom Plantae and are essential for producing oxygen, food, and habitats for countless species, including humans.',
  );
  const [chatId, setChatId] = React.useState();
  const [questions, setQuestions] = React.useState();
  const [noteId, setNoteId] = React.useState();
  const [note, setNote] = React.useState();

  React.useEffect(() => {
    getStoragePermission();
  }, [isFocused]);

  const validate = () => {
    if (
      title !== null &&
      title !== '' &&
      subject !== null &&
      subject !== '' &&
      topic !== null &&
      topic !== '' &&
      totalQues !== null &&
      totalQues !== '' &&
      content !== null &&
      content !== ''
    ) {
      handleGenerateQuestion();
    } else {
      Alert.alert('Error', 'Fill in all required fields!');
    }
  };

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    const fetchApi = await insertNoteApi(content, title, subject, topic);
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    if (dataApi.status === 200) {
      setNoteId(resultApi.noteid);
      const fetchApi2 = await generateQuestion(
        totalQues,
        resultApi.noteid,
        subject,
        topic,
      );
      const dataApi2 = fetchApi2[0];
      const resultApi2 = fetchApi2[1];

      if (dataApi2.status === 200) {
        setChatId(resultApi2.chatId);
        setQuestions(resultApi2.question);

        if (
          resultApi2.chatId !== null &&
          resultApi2.chatId !== '' &&
          resultApi2.chatId !== undefined &&
          resultApi2.question !== null &&
          resultApi2.question !== '' &&
          resultApi2.question !== undefined
        ) {
          setIsLoading(false);
          Alert.alert('Success', 'Question generated successfully!');
        }
      } else {
        Alert.alert('Error', 'Error encountered');
        setIsLoading(false);
      }
    } else {
      Alert.alert('Error', 'Error encountered');
      setIsLoading(false);
    }
  };

  const onChangeAnswer = (index, text) => {
    const myQuestions = [...questions];
    const newQuestions = myQuestions.map((quest, i) => {
      if (index === i) {
        return {...quest, userAnswer: text};
      } else {
        return quest;
      }
    });

    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    setIsLoading2(true);
    const fetchApi = await submitAnswer(
      totalQues,
      noteId,
      questions,
      subject,
      topic,
      chatId,
    );
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    if (dataApi.status === 200) {
      setIsLoading2(false);

      navigation.navigate('ViewQuizResult', resultApi);

      setTitle('');
      setSubject('');
      setTopic('');
      setTotalQues('');
      setContent('');
      setChatId('');
      setQuestions();
    } else {
      Alert.alert('Error', 'Error encountered');
      setIsLoading2(false);
    }
  };

  const getStoragePermission = async () => {
    if (Platform.OS === 'ios') {
      console.log('Permission Granted');
    } else {
      if (Number(Platform.Version) < 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Start downloading
            console.log('Storage Permission Granted.');
          } else {
            // If permission denied then show alert
            Alert.alert(
              'Error',
              'Storage Permission Not Granted to Download File',
            );
          }
        } catch (err) {
          // To handle permission related exception
          console.log('++++' + err);
        }
      }
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
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#078EC6',
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
                  value={content}
                  onChangeText={text => setContent(text)}
                />
                <Divider
                  style={{flex: 1, borderColor: '#6E6E6E', marginVertical: 10}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{flex: 0.3}}>Title* : </Text>
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
                    value={title}
                    onChangeText={text => setTitle(text)}
                  />
                </View>
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
                  <Text style={{flex: 0.3}}>Chapter/Topic* : </Text>
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
                    value={topic}
                    onChangeText={text => setTopic(text)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <Text style={{flex: 0.3}}>Total Questions* : </Text>
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
                    value={totalQues}
                    onChangeText={text => setTotalQues(text)}
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
                  marginBottom: 30,
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
                    Generate Questions
                  </Text>
                )}
              </TouchableOpacity>
              {questions && chatId && (
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
                    Quiz: {totalQues} questions
                  </Text>
                  {questions.map((question, index) => (
                    <View key={index} style={{flexDirection: 'row', gap: 5}}>
                      <Text style={{color: 'black', fontWeight: 500}}>
                        {index + 1}.
                      </Text>
                      <View style={{gap: 5, flex: 1}}>
                        <Text style={{color: 'black', fontWeight: 500}}>
                          {question.question}
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
                          multiline
                          value={question.userAnswer}
                          onChangeText={text => onChangeAnswer(index, text)}
                        />
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      width: '100%',
                      backgroundColor: '#024E9C',
                      elevation: 2,
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.2,
                      shadowRadius: 1,
                      marginBottom: 10,
                    }}
                    disabled={isLoading2}
                    onPress={() => handleSubmit()}>
                    {isLoading2 ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        Submit
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;
