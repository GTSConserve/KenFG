import React from 'react';
import tailwind from '../../../../../tailwind';
import assets from '../../../../constants/assets_manifest';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import clr from '../../../../constants/colors';

interface PropTypes {
  player_key: string;
  teamname: string;
  image: string;
  name: string;
  role: string;
  info: string;
  anounced: boolean;
  points: number;
  credits: number;
  isTeam_a: boolean;
  status: number;
  checkPlayerSelection(player_key: string, player_role: string): void;
  onPressPlayerProfile(player_key: string, player_role: string): any;
  dT: boolean;
}
function Player(props: PropTypes) {
  const dT = props.dT;
  // useRenderCount(`${props.player_key}`);

  return (
    <View>
      <View
        style={[
          dT ? ss.droot : ss.lroot,
          props.status === 0 && ss.selectedUser,
          props.status === -1 && ss.disabledUser,
        ]}>
        {/* Image */}
        <TouchableOpacity
          onPress={() =>
            props.onPressPlayerProfile(props.player_key, props.role)
          }
          activeOpacity={0.5}
          style={[tailwind('ml-4'), {flex: 2}]}>
          <Image
            resizeMode="contain"
            source={assets.player}
            style={[tailwind(''), {height: 62, width: 70}]}
          />
          <TeamBadge name={props.teamname} team_a={props.isTeam_a} />
          {/* For Debug */}
          {/* <Text
            style={[
              tailwind('font-regular text-white font-15 absolute inset-0'),
            ]}>
            {props.status}
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.checkPlayerSelection(props.player_key, props.role)
          }
          style={[tailwind('flex-row'), {flex: 8}]}>
          <View style={[tailwind('pl-4'), {flex: 4}]}>
            <Text numberOfLines={1} style={[ss.pname, !dT && clr.td1]}>
              {props.name}
            </Text>
            <Text numberOfLines={1} style={[ss.pinfo, !dT && clr.tdgray]}>
              {props.info}
            </Text>
            <View style={[tailwind('flex-row items-center')]}>
              <View
                style={[
                  tailwind('w-1 h-1 mr-2 rounded-full'),
                  {backgroundColor: '#B2933D'},
                ]}></View>
              {props.anounced ? (
                <Text style={[ss.playerAnounced, !dT && clr.tgreen]}>
                  Anounced
                </Text>
              ) : (
                <Text style={[ss.playerlastPlayed, !dT && clr.tr]}>
                  Played Last Match
                </Text>
              )}
            </View>
          </View>

          {/* Points */}
          <View
            style={[
              tailwind('flex-col items-start  justify-center'),
              {flex: 2},
            ]}>
            <Text
              style={[
                tailwind('font-regular text-dark-1 font-13'),
                !dT && clr.td1,
              ]}>
              {props.points}
            </Text>
          </View>

          {/* credits */}

          <View style={[tailwind('flex-row items-center'), {flex: 2}]}>
            <Text
              style={[
                tailwind('font-bold px-2 text-white text-right font-13'),
                !dT && clr.td1,
              ]}>
              {props.credits}
            </Text>

            {props.status === 0 ? (
              <AddedButton />
            ) : (
              <AddButton status={props.status} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TeamBadge = (props: any) => {
  return (
    <View
      style={[
        tailwind('absolute bottom-0 rounded-t'),
        {backgroundColor: props.team_a ? '#244785' : '#70211E', padding: 3},
      ]}>
      <Text style={[tailwind('font-bold uppercase text-light font-9')]}>
        {props.name}
      </Text>
    </View>
  );
};

const AddButton = (props: any) => {
  // disable add button when an player is no longer can be selected
  if (props.status === -1) {
    return null;
  }
  return (
    <LinearGradient
      colors={['#006A4D', '#00513B']}
      style={[
        tailwind(
          'flex-col items-center justify-center absolute rounded-l-lg px-1 right-0',
        ),
      ]}>
      <Icon name="add" color="white" size={20} />
    </LinearGradient>
  );
};

const AddedButton = () => {
  return (
    <LinearGradient
      colors={['#816D2E', '#614920']}
      style={[
        tailwind(
          'flex-col items-center justify-center absolute rounded-l-lg px-1 right-0',
        ),
      ]}>
      <Icon name="remove" color="white" size={20} />
    </LinearGradient>
  );
};

const ss = StyleSheet.create({
  droot: {
    paddingTop: 12,
    flexDirection: 'row',
    backgroundColor: '#172338',
    borderColor: 'rgba(31, 41, 55,1)',
    borderBottomWidth: 1,
  },
  lroot: {
    paddingTop: 12,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(31, 41, 55,0.1)',
    borderBottomWidth: 1,
  },
  selectedUser: {
    backgroundColor: '#3C362C',
  },
  disabledUser: {
    backgroundColor: '#172338',
    opacity: 0.5,
  },
  pname: {
    fontSize: 13,
    fontFamily: 'gadugi-bold',
    color: '#FFFFFF',
    paddingBottom: 2,
  },
  pinfo: {
    fontSize: 11,
    fontFamily: 'gadugi-regular',
    color: '#E0E0E0',
    paddingVertical: 4,
  },
  playerlastPlayed: {
    fontSize: 9,
    fontFamily: 'gadugi-normal',
    color: '#d1b45a',
  },
  playerAnounced: {
    fontSize: 9,
    fontFamily: 'gadugi-normal',
    color: '#00513B',
  },
});

export default React.memo(Player);
