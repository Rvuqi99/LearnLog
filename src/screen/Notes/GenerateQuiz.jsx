import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Keyboard,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {generateQuestion, submitAnswer} from '../../utils/allApi';

const GenerateQuiz = ({navigation}) => {
  const route = useRoute();
  const [totalQues, setTotalQues] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [isLoading2, setIsLoading2] = React.useState();
  const [chatId, setChatId] = React.useState();
  const [questions, setQuestions] = React.useState();

  React.useEffect(() => {
    console.log(route.params);
    console.log(route.params.pastQuiz[0].questions);
  }, []);

  const validate = () => {
    if (totalQues !== null || totalQues !== '') {
      handleGenerateQuestion();
    } else {
      Alert.alert('Error', 'Fill in all required fields!');
    }
  };

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    const fetchApi = await generateQuestion(
      totalQues,
      route.params.noteid,
      route.params.tags[0],
      route.params.tags[1],
    );
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    if (dataApi.status === 200) {
      setChatId(resultApi.chatId);
      setQuestions(resultApi.question);

      if (
        resultApi.chatId !== null ||
        resultApi.chatId !== '' ||
        resultApi.chatId !== undefined ||
        resultApi.question !== null ||
        resultApi.question !== '' ||
        resultApi.question !== undefined
      ) {
        setIsLoading(false);
        Alert.alert('Success', 'Question generated successfully!');
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
      route.params.noteid,
      questions,
      route.params.tags[0],
      route.params.tags[1],
      chatId,
    );
    const dataApi = fetchApi[0];
    const resultApi = fetchApi[1];

    console.log(dataApi);
    console.log(resultApi);

    if (dataApi.status === 200) {
      setIsLoading2(false);

      navigation.navigate('ViewQuizResult', resultApi);
    } else {
      Alert.alert('Error', 'Error encountered');
      setIsLoading2(false);
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
                Generate Quiz
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
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <Text style={{flex: 0.3}}>Total Questions : </Text>
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
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    width: '100%',
                    backgroundColor: '#148A3C',
                    elevation: 2,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
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
              </View>
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

export default GenerateQuiz;
