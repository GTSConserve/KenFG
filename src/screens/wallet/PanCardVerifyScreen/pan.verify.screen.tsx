import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import tailwind from '../../../../tailwind';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Ionicons';

import {useSelector} from 'react-redux';

import {
  ButtonComponent,
  TopBar,
  BlockScreenByLoading,
} from '../../../sharedComponents';
import {userInfo} from '../../../store/selectors';
import {format, isEqual} from 'date-fns';

const log = console.log;

interface PropTypes {
  name: any;
  setName(e: any): any;
  pan: any;
  setPan(e: any): any;
  dob: any;
  setDob(e: any): any;
  image: any;
  validateInputs(): any;
  error: any;
  openDate: any;
  setOpenDate(e: boolean): any;
  onDateChangedAction(e: any): any;
  removeImage(): any;
  openLibrary(): any;
}

const TEXTCOLOR = '#8797B1';

export default function PanVerifyScreen(props: PropTypes) {
  return (
    <View style={tailwind('h-full bg-dark')}>
      <TopBar text={'Verify PAN Card'} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[tailwind('p-3')]}>
          {/* name input */}
          <View style={[ss.inputContainer]}>
            <InputTitle text="Name" />
            <TextInput
              style={[ss.textInput]}
              value={props.name}
              onChangeText={(e: any) => props.setName(e)}
            />
            {props.error.target === 'name' && (
              <ErrorInput msg={props.error.msg} />
            )}
          </View>

          <View style={[ss.inputContainer]}>
            <InputTitle text="Pan card number" />
            <TextInput
              style={[ss.textInput]}
              value={props.pan}
              onChangeText={(e: any) => props.setPan(e)}
            />
            {props.error.target === 'pan' && (
              <ErrorInput msg={props.error.msg} />
            )}
          </View>

          <View style={[ss.inputContainer]}>
            <InputTitle text="Date of Birth" />
            <TouchableOpacity
              onPress={() => props.setOpenDate(true)}
              style={[ss.textInput]}>
              <Text style={[ss.dobText]}>
                {props.dob && format(props.dob, 'dd-MM-yyyy')}
              </Text>
            </TouchableOpacity>
            {props.error.target === 'dob' && (
              <ErrorInput msg={props.error.msg} />
            )}
          </View>

          {/* Image  */}
          {props.image ? (
            <ImageUploaded
              openLibrary={props.openLibrary}
              removeImage={props.removeImage}
            />
          ) : (
            <ImageUpload openLibrary={props.openLibrary} />
          )}
          {props.error.target === 'image' && (
            <ErrorInput msg={props.error.msg} />
          )}

          {/* <View style={[ss.inputContainer]}>
            <InputTitle text="Image" />
            <TouchableOpacity
              onPress={props.openLibrary}
              style={[ss.textInput]}>
              <Text style={[ss.dobText]}>
                {props.image && (
                  <Text style={[tailwind('font-regular text-white font-15')]}>
                    Image added
                  </Text>
                )}
              </Text>
            </TouchableOpacity>
            {props.error.target === 'image' && (
              <ErrorInput msg={props.error.msg} />
            )}
          </View> */}

          <Instruction />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={props.validateInputs}
        style={[tailwind('m-3')]}>
        <ButtonComponent text={'Submit Details'} />
      </TouchableOpacity>
      {/* {props.initiatePayment.isLoading && <BlockScreenByLoading />}
      {props.updateWallet.isLoading && <BlockScreenByLoading />} */}
      {props.openDate && (
        <DateTimePicker
          value={props.dob ? props.dob : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          display="default"
          onChange={props.onDateChangedAction}
        />
      )}
    </View>
  );
}

function InputTitle(props: any) {
  return (
    <Text
      style={[
        tailwind('font-regular text-red-500 px-0.5 font-15'),
        {color: TEXTCOLOR},
      ]}>
      {props.text}
    </Text>
  );
}

function ErrorInput(props: any) {
  return (
    <Text style={[tailwind('font-regular text-red-600 p-0.5 font-15')]}>
      {props.msg}
    </Text>
  );
}

function Instruction(props: any) {
  return (
    <View style={[ss.inputContainer]}>
      <Text style={[tailwind('font-bold uppercase text-white font-13')]}>
        Important
      </Text>
      <View style={[tailwind('flex-row items-center pt-3')]}>
        <Icon name="ellipse" size={8} color="gray" />
        <Text
          style={[
            tailwind('font-regular mx-1 text-red-500 px-0.5 font-12'),
            {color: TEXTCOLOR},
          ]}>
          Full name on PAN Card and bank account must match
        </Text>
      </View>

      <View style={[tailwind('flex-row items-center pt-3')]}>
        <Icon name="ellipse" size={8} color="gray" />
        <Text
          style={[
            tailwind('font-regular mx-1 text-red-500 px-0.5 font-12'),
            {color: TEXTCOLOR},
          ]}>
          It takes max 1 working day to get PAN verified
        </Text>
      </View>
    </View>
  );
}
function ImageUpload(props: any) {
  return (
    <TouchableOpacity onPress={props.openLibrary} style={[ss.imageIContainer]}>
      <Icon name="image" size={20} color="lightgray" />
      <Text style={[tailwind('font-regular mx-2 text-white font-13')]}>
        Upload PAN Card Image
      </Text>
    </TouchableOpacity>
  );
}
function ImageUploaded(props: any) {
  return (
    <View style={[tailwind('justify-between'), ss.imageIContainer]}>
      <TouchableOpacity
        onPress={props.openLibrary}
        style={[tailwind('flex-row items-center')]}>
        <Icon name="link" size={20} color="lightgray" />
        <Text style={[tailwind('font-regular mx-2 text-white font-13')]}>
          Image selected
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.removeImage}
        style={[tailwind('flex-row items-center')]}>
        <Text style={[tailwind('font-regular text-white font-11 uppercase')]}>
          Clear
        </Text>
        <Icon name="close" size={15} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

{
  /* <EnterAmountAddCash />
<SubTitleAddCash text={'Coupon Codes'} />
<EnterCouponAddCash code={code} setCode={setCode} />
<CouponCardAddCash />
<CouponCardAddCash /> */
}

const ss = StyleSheet.create({
  root: {},
  inputContainer: {
    padding: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  textInput: {
    borderColor: 'rgba(31, 41, 55,1)',
    borderRadius: 2,
    borderWidth: 1,
    padding: 6,
    marginTop: 8,
    color: '#FFFFFF',
  },
  imageIContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(31, 41, 55,1)',
    borderRadius: 2,
    borderWidth: 1,
    padding: 8,
    margin: 4,
    color: '#FFFFFF',
  },
  dobText: {
    paddingVertical: 4,
    color: '#FFFFFF',
  },
});