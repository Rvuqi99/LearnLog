import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const ViewResult = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
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
            <View style={{backgroundColor: '#148A3C', borderRadius: 10}}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 5,
                  padding: 10,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  13 / 20
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
              Quiz: 15 questions
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, width: '90%'}}>
            <Text style={{color: 'black', fontWeight: 500}}>1.</Text>
            <View style={{gap: 5, flex: 1}}>
              <Text style={{color: 'black', fontWeight: 500}}>
                What is the name of my pet?
              </Text>
              <Text style={{color: '#6E6E6E'}}>Answer:</Text>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  flex: 0.7,
                  color: 'white',
                  backgroundColor: '#148A3C',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Tunku abdul rahman</Text>
                <Icon name="check" color="white" />
              </View>
              <Text style={{color: '#024E9C'}}>
                Explanations: Tunku Abdul Rahman Putra is the first Prime
                Minister of Malaysia on 31 August 1957
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 5, width: '90%'}}>
            <Text style={{color: 'black', fontWeight: 500}}>1.</Text>
            <View style={{gap: 5, flex: 1}}>
              <Text style={{color: 'black', fontWeight: 500}}>
                What is the name of my pet?
              </Text>
              <Text style={{color: '#6E6E6E'}}>Answer:</Text>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  flex: 0.7,
                  color: 'white',
                  backgroundColor: '#148A3C',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Tunku abdul rahman</Text>
                <Icon name="check" color="white" />
              </View>
              <Text style={{color: '#024E9C'}}>
                Explanations: Tunku Abdul Rahman Putra is the first Prime
                Minister of Malaysia on 31 August 1957
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewResult;
