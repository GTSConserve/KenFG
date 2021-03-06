import React, {useState} from 'react';
import tailwind from '../../../tailwind';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import assets from '../../constants/assets_manifest';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {removeToken} from '../../utils/authTokenUtils';
import {getAppThemeSelector} from '../../store/selectors';
import {userInfo} from '../../store/selectors';
import clr from '../../constants/colors';
//@ts-ignore
import RNRestart from 'react-native-restart';
import {
  EditIcon,
  MoneySideIcon,
  WalletSideIcon,
  LeaderSideIcon,
  SettingSideIcon,
  MoreSideIcon,
  ChatSideIcon,
  HelpSideIcon,
} from '../../assets/newIcons';

interface LinkTypes {
  dT: boolean;
  to: string;
  icon: string;
  text: string;
  navigate(to: string): any;
}

export default function CustomDrawer(props: any) {
  const navigation = useNavigation<any>();
  const dT = useSelector(getAppThemeSelector);

  const [logoutModal, setLogoutModal] = useState(false);
  const userMeta = useSelector(userInfo);

  function navigate(to: string) {
    switch (to) {
      case 'wallet':
        navigation.navigate('Wallet');
        return;
      case 'refer':
        navigation.navigate('ReferredFriendsListScreen');
        return;
      case 'leaderboard':
        navigation.navigate('Leaderboard');
        return;
      case 'achievement':
        navigation.navigate('AchievementsScreen');
        return;
      case 'affliate':
        navigation.navigate('AffliatedScreen');
        return;
      case 'settings':
        navigation.navigate('ProfileEditScreen');
        return;
      case 'howtoplay':
        navigation.navigate('HowToPlayScreen');
        return;
      case 'more':
        navigation.navigate('More');
        return;
      default:
        return;
    }
  }

  const logout = async () => {
    setLogoutModal(false);
    await removeToken();
    RNRestart.Restart();
  };

  return (
    <View style={[tailwind('h-full'), dT ? clr.bgd2 : clr.bgw]}>
      <ScrollView>
        <UserInfo name={userMeta?.name} dT={dT} />
        <WalletLink to="wallet" navigate={navigate} dT={dT} money={'10,0000'} />
        <ReferaAndEarn dT={dT} navigate={navigate} to="refer" />
        <Links
          to="leaderboard"
          icon={'leader'}
          text="Leaderboard"
          dT={dT}
          navigate={navigate}
        />
        <Links
          to="achievement"
          icon={'achivement'}
          text="Achievements"
          dT={dT}
          navigate={navigate}
        />
        <Links
          to="affliate"
          icon={'affliate'}
          text="Affilated"
          dT={dT}
          navigate={navigate}
        />

        <Links
          to="settings"
          icon={'settings'}
          text="My Info Settings"
          navigate={navigate}
          dT={dT}
        />
        <Links
          to="howtoplay"
          icon={'how'}
          text="How to Play"
          dT={dT}
          navigate={navigate}
        />

        <Links
          to="more"
          icon={'more'}
          text="More"
          dT={dT}
          navigate={navigate}
        />
        {/* <View> */}
        <AppVersion version="0.1" dT={dT} />
        {/* <View /> */}
        <Support dT={dT} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => setLogoutModal(true)}
        style={[
          tailwind('p-4'),
          {
            backgroundColor: '#816D2E',
          },
        ]}>
        <Text
          style={[
            tailwind('font-bold text-center text-light uppercase font-15'),
          ]}>
          Logout
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={logoutModal}
        animationInTiming={150}
        animationOutTiming={150}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        scrollHorizontal={true}>
        <View style={[ss.modalC, dT ? clr.bgd1 : clr.bgw]}>
          <Text style={[ss.modaltx1, dT ? clr.tw : clr.td1]}>
            Do you want to Logout ?
          </Text>
          <Text style={[ss.modaltx2, dT ? clr.tw : clr.td1]}>
            This will logged out from the app, Press YES to proceed
          </Text>

          <View style={[ss.actionC]}>
            <TouchableOpacity onPress={logout} style={[ss.space1]}>
              <Text style={[ss.actionTxt, dT ? clr.tw : clr.td1]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ss.space2]}
              onPress={() => setLogoutModal(false)}>
              <Text style={[ss.actionTxt, dT ? clr.tw : clr.td1]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const UserInfo = (props: any) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('AccountProfileScreen')}
      style={[ss.proot, props.dT ? clr.bgd1 : clr.bgGray]}>
      <View style={[ss.prC]}>
        <View style={[ss.imgC]}>
          <View style={[ss.imgBox]}>
            <Image
              resizeMode="contain"
              source={assets.user_temp_profile}
              style={[ss.img]}
            />
          </View>
          <View style={[ss.editC]}>
            <EditIcon dT={props.dT} />
          </View>
        </View>

        <View style={[ss.pctnt]}>
          <Text
            numberOfLines={1}
            style={[ss.name, props.dT ? clr.tw : clr.td1]}>
            {props.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[ss.fullname, props.dT ? clr.tw : clr.td1]}>
            {props.name}
          </Text>
          <View style={[ss.levelRoot]}>
            <Image
              resizeMode="contain"
              source={assets.levels}
              style={[ss.lvlImg]}
            />

            <Text style={[ss.lvlTxt, props.dT ? clr.tw : clr.td1]}>
              Level 001
            </Text>
          </View>
        </View>
      </View>

      <View style={[tailwind(''), {flex: 1}]}>
        {/* <TouchableOpacity>
          <Icon name="arrow-forward" size={20} color="white" />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

// log(tailwind('font-regular text-brown-1 font-13'))
function WalletLink(props: any) {
  return (
    <TouchableOpacity
      onPress={() => props.navigate(props.to)}
      style={[ss.linkRoot]}>
      <View style={[{flex: 2}]}>
        <WalletSideIcon dT={props.dT} />
      </View>
      <View style={[tailwind(''), {flex: 6}]}>
        <Text style={[ss.linkTxt, props.dT ? clr.tw : clr.td1]}>
          My Balance
        </Text>
      </View>
      <View style={[tailwind('items-end'), {flex: 4}]}>
        <Text style={[ss.linkTxt, props.dT ? clr.tgl : clr.tr]}>
          {'\u20B9 '}
          {props.money}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const Links = (props: LinkTypes) => {
  const newLocal = 'flex-row items-center py-3 mx-4';
  const newLocal_1 = 'font-regular text-light font-13';

  return (
    <TouchableOpacity
      onPress={() => props.navigate(props.to)}
      style={[tailwind(newLocal)]}>
      <View style={[tailwind(''), {flex: 2}]}>
        {props.icon === 'leader' && <LeaderSideIcon dT={props.dT} />}
        {props.icon === 'achivement' && <LeaderSideIcon dT={props.dT} />}
        {props.icon === 'affliate' && <LeaderSideIcon dT={props.dT} />}
        {props.icon === 'settings' && <SettingSideIcon dT={props.dT} />}
        {props.icon === 'how' && <HelpSideIcon dT={props.dT} />}
        {props.icon === 'more' && <MoreSideIcon dT={props.dT} />}
      </View>
      <View style={[tailwind(''), {flex: 6}]}>
        <Text style={[tailwind(newLocal_1), props.dT ? clr.tw : clr.td1]}>
          {props.text}
        </Text>
      </View>
      <View style={{flex: 4}}></View>
    </TouchableOpacity>
  );
};

const AppVersion = (props: any) => {
  return (
    <View style={[tailwind('flex-row px-4 py-3')]}>
      <View style={[tailwind(''), {flex: 7}]}>
        <Text style={[tailwind('font-regular text-dark-1 font-12')]}>
          Version 0.1
        </Text>
        <Text style={[tailwind('font-regular py-1 text-dark-1 font-11')]}>
          28 March : 8:45 PM
        </Text>
      </View>
      {/* <View style={[tailwind('justify-end items-end'), {flex: 3}]}>
          <Text
            style={[tailwind('font-regular text-dark-1 uppercase font-13')]}>
            UPDATE
          </Text>
        </View> */}
    </View>
  );
};

const Support = (props: any) => {
  return (
    <View style={[tailwind('flex-row items-center py-4 px-4')]}>
      <View style={[tailwind('flex-row items-center'), {flex: 6}]}>
        <View style={[tailwind(''), {flex: 3}]}>
          <View style={[tailwind('rounded-full'), {width: 18, height: 18}]}>
            <Image
              resizeMode="contain"
              source={assets.question_icon}
              style={[tailwind('w-full h-full')]}
            />
          </View>
        </View>
        <Text
          style={[
            tailwind('font-regular font-12'),
            props.dT ? clr.td2 : clr.td1,
            {flex: 7},
          ]}>
          Helpdesk
        </Text>
      </View>

      <View style={[tailwind('flex-row items-center'), {flex: 6}]}>
        <View style={[tailwind(''), {flex: 3}]}>
          <ChatSideIcon dT={props.dT} />
        </View>
        <Text
          style={[
            tailwind('font-regular text-light font-12'),
            props.dT ? clr.td2 : clr.td1,
            {flex: 7},
          ]}>
          Chat With Us
        </Text>
      </View>
    </View>
  );
};

const ReferaAndEarn = (props: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('InviteScreen')}
      style={[tailwind('flex-row items-center py-3 mx-4')]}>
      <View style={[tailwind(''), {flex: 2}]}>
        <MoneySideIcon dT={props.dT} />
      </View>
      <View style={[tailwind('flex-row  items-center'), {flex: 7}]}>
        <Text style={[ss.linkTxt, props.dT ? clr.tw : clr.td1]}>
          Refer and Earn
        </Text>
        <Text
          style={[ss.linkTxt, tailwind('px-2'), props.dT ? clr.tgl : clr.td1]}>
          {'\u20B9'} 500
        </Text>
      </View>
      <View style={[tailwind('items-end'), {flex: 3}]}>
        <View
          style={[
            tailwind('border px-2 py-1 rounded'),
            props.dT ? ss.dinvite : ss.linvite,
          ]}>
          <Text
            style={[ss.linkTxt, props.dT ? clr.tgl : clr.td1, {fontSize: 12}]}>
            INVITE
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ss = StyleSheet.create({
  dinvite: {
    borderColor: '#d1b45a',
  },
  linvite: {
    borderColor: '#d80203',
  },
  linkRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 12,
  },
  linkTxt: {
    fontFamily: 'gadugi-normal',
    fontSize: 13,
  },
  modalC: {
    padding: 18,
    borderRadius: 6,
    borderColor: 'rgba(17, 24, 39,1)',
    borderWidth: 1,
  },
  modaltx1: {
    fontFamily: 'gadugi-bold',
    fontSize: 17,
  },
  modaltx2: {
    fontFamily: 'gadugi-normal',
    fontSize: 12,
    paddingTop: 12,
  },
  actionC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionTxt: {
    fontFamily: 'gadugi-bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  space1: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  space2: {
    paddingTop: 8,
  },
  proot: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  prC: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 9,
  },
  imgC: {
    flex: 3,
  },
  imgBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  img: {
    width: 60,
    height: 60,
  },
  editC: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  pctnt: {
    paddingLeft: 12,
    flex: 7,
  },
  name: {
    fontFamily: 'gadugi-bold',
    fontSize: 15,
  },
  fullname: {
    fontFamily: 'gadugi-normal',
    fontSize: 12,
    paddingVertical: 4,
  },
  levelRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  lvlImg: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  lvlTxt: {
    fontFamily: 'gadugi-normal',
    fontSize: 13,
    paddingHorizontal: 4,
  },
});
