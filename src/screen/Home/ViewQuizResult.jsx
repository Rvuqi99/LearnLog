import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';

const ViewQuizResult = ({navigation}) => {
  const route = useRoute();

  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {route?.params ? (
        <ScrollView style={{flex: 1}}>
          <View
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
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="arrow-left"
                    type="octicon"
                    color="#024E9C"
                    size={30}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#024E9C',
                  }}>
                  View Result
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    parseInt(route?.params.analysis.score.userScore) >
                    parseInt(route?.params.analysis.score.totalQuestion) / 3
                      ? '#148A3C'
                      : '#E25454',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                    padding: 10,
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                    {route?.params.analysis.score.userScore} /{' '}
                    {route?.params.analysis.score.totalQuestion}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{width: '90%'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#024E9C',
                }}>
                Quiz: {route?.params.analysis.score.totalQuestion} questions
              </Text>
            </View>
            {route?.params.analysis.questions.map((question, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', gap: 5, width: '90%'}}>
                <Text style={{color: 'black', fontWeight: 500}}>
                  {index + 1}.
                </Text>
                <View style={{gap: 5, flex: 1}}>
                  <Text style={{color: 'black', fontWeight: 500}}>
                    {question.question}
                  </Text>
                  <Text style={{color: '#6E6E6E'}}>Answer:</Text>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      flex: 0.7,
                      color: 'white',
                      backgroundColor: question.isCorrect
                        ? '#148A3C'
                        : '#E25454',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>
                      {question.userAnswer === '' ? '-' : question.userAnswer}
                    </Text>
                    <Icon
                      name={question.isCorrect ? 'check' : 'close'}
                      color="white"
                    />
                  </View>
                  <Text style={{color: '#024E9C'}}>
                    <Text style={{fontWeight: 'bold'}}>Explanations: </Text>
                    {question.explanation}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={{
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                width: '90%',
                backgroundColor: '#148A3C',
                elevation: 2,
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1,
                marginVertical: 30,
              }}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#7598ca" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewQuizResult;
