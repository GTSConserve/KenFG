import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import tailwind from '../../../../tailwind';
// import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {errorBox, infoBox} from '../../../utils/snakBars';
import {signupRemote} from '../../../remote/authRemote';
// import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../constants/assets_manifest';

import {
  BlockScreenByLoading,
  ButtonComponent,
  SocialLogin,
} from '../../../sharedComponents';
const log = console.log;

export default function SignupScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [mobile, setMobile] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const [ref, setRef] = useState('');
  const [showHint, setShowHint] = useState(true);
  const [showInvite, setShowInvite] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setShowHint(false);
    });
    const close = Keyboard.addListener('keyboardDidHide', () => {
      setShowHint(true);
    });
    return () => {
      show.remove();
      close.remove();
    };
  }, []);

  const openInviteInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowInvite(true);
  };

  const navigate = async () => {
    try {
      const mobileNumber = mobile.replace(/ /g, '');
      log(mobileNumber.length);
      if (mobileNumber.length !== 10) {
        throw new Error('Invalid Mobile Number');
      }
      setLoading(true);
      const response = await signupRemote({
        mobile,
        ref,
      });
      if (!response) {
        throw new Error('Please check your internet');
      }
      navigation.navigate('OTPScreen', {
        mobile,
        otp: response.otp,
      });
    } catch (err: any) {
      errorBox(`${err.message}`, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tailwind('bg-dark h-full')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          tailwind('py-9 bg-dark-3'),
          {paddingHorizontal: 26},
        ]}>
        <View style={[tailwind('flex-row items-center justify-center')]}>
          <Image
            resizeMode="contain"
            source={assets.logo_new}
            style={[tailwind(''), {width: 92, height: 28}]}
          />
        </View>

        <Text
          style={[
            tailwind('font-bold text-light pt-9 text-center'),
            {fontSize: 24},
          ]}>
          Welcome to KenFG!
        </Text>
        <Text
          style={[
            tailwind('font-regular text-dark-1 pt-1 text-center font-12'),
          ]}>
          Register to Continue
        </Text>
          
        <View style={[tailwind(' pt-8 pb-4 ')]}>
          <Text style={[tailwind('font-regular text-dark-1 font-14')]}>
            Mobile No
          </Text>
          <TextInput
            maxLength={10}
            value={mobile}
            keyboardAppearance="dark"
            keyboardType="decimal-pad"
            onChangeText={e => setMobile(e)}
            style={[
              tailwind('border-b font-bold text-white font-20'),
              {
                borderColor: '#8797B14D',
                padding: 0,
                margin: 0,
                paddingVertical: 5,
              },
            ]}
          />
          <Text style={[tailwind('font-regular font-12 text-dark-1 pt-2')]}>
            You will receive OTP for Verification
          </Text>
        </View>
        {showInvite && (
          <View style={[tailwind('pt-1 pb-4')]}>
            <Text style={[tailwind('font-regular text-dark-1 font-14')]}>
              Enter Invite Code
            </Text>
            <TextInput
              maxLength={7}
              value={inviteCode}
              onChangeText={e => setInviteCode(e)}
              style={[
                tailwind('border-b font-bold text-light font-20'),
                {borderColor: '#8797B14D', height: 40},
              ]}
            />
          </View>
        )}

        <TouchableOpacity onPress={navigate}>
          <ButtonComponent text={'REGISTER'} />
        </TouchableOpacity>
        <OR />
        <SocialLogin />
        <TC />
      </ScrollView>

      {showHint && <FooterHint openInviteInput={openInviteInput} />}

      {loading && <BlockScreenByLoading />}
    </View>
  );
}

const OR = () => {
  return (
    <View style={[tailwind('flex-row items-center my-4')]}>
      <View
        style={[
          tailwind(''),
          {flex: 5, backgroundColor: '#8797B11A', height: 1},
        ]}></View>
      <Text
        style={[
          tailwind('font-regular text-center font-12 text-dark-1'),
          {flex: 1.5},
        ]}>
        OR
      </Text>
      <View
        style={[
          tailwind(''),
          {flex: 5, backgroundColor: '#8797B11A', height: 1},
        ]}></View>
    </View>
  );
};

const FooterHint = (props: any) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[tailwind('p-4 flex-row items-center justify-between')]}>
      <View>
        <Text style={[tailwind('font-regular text-dark-1 font-13')]}>
          Have a referral Code ?{' '}
        </Text>
        <TouchableOpacity onPress={props.openInviteInput}>
          <Text style={[tailwind('font-bold text-white underline font-15')]}>
            Enter Code
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={[tailwind('font-regular text-dark-1 font-13')]}>
          Already a user ?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={[
              tailwind('font-bold text-white text-right underline font-15'),
            ]}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TC = () => {
  return (
    <View style={[tailwind('flex-row justify-center items-center pt-5')]}>
      <Text style={[tailwind('font-regular text-dark-1 font-12')]}>
        By registering you agree to the
      </Text>
      <Text style={[tailwind('font-bold px-1 underline text-white font-12')]}>
        T&C
      </Text>
      <Text style={[tailwind('font-regular text-dark-1 font-12')]}>
        {' '}
        of KenFG
      </Text>
    </View>
  );
};
