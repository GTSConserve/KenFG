import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import assets from '../../../../constants/assets_manifest';
import clr from '../../../../constants/colors';

interface PropTypes {
  image?: string;
  player_key: string;
  name: string;
  points: string;
  teamname: string;
  c: string;
  vc: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  is_team_a: boolean;
  seasonRole: string;
  captainSelectAction(player_key: string): any;
  viceCaptainSelect(player_key: string): any;
  dT: boolean;
}

export default function PlayerCapSelection(props: PropTypes) {
  const dT = props.dT;
  return (
    <View style={[dT ? ss.dRoot : ss.lRoot]}>
      <View style={[tailwind('pt-2 flex-row items-center')]}>
        <View style={[tailwind('flex-row'), {flex: 5}]}>
          <Image
            resizeMode="contain"
            source={assets.player}
            style={{width: 62, height: 62}}
          />

          <View style={[tailwind('flex-col justify-center ml-6'), {flex: 1}]}>
            <Text numberOfLines={1} style={[ss.name, dT ? clr.tw : clr.td1]}>
              {props.name}
            </Text>
            <Text style={[ss.point, dT ? clr.td2 : clr.tdgray]}>
              {props.points}
            </Text>
          </View>
        </View>
        <TeamTag
          teamname={props.teamname}
          role={props.role}
          seasonRole={props.seasonRole}
          is_team_a={props.is_team_a}
        />

        {/* Points */}
        <View
          style={[
            tailwind('flex-row justify-between items-center'),
            {flex: 5},
          ]}>
          <View
            style={[
              tailwind('flex-col justify-center items-center'),
              {flex: 5},
            ]}>
            <TouchableOpacity
              onPress={() => props.captainSelectAction(props.player_key)}
              style={[
                tailwind(
                  `rounded-3xl ${
                    props.is_captain
                      ? 'bg-secondary p-3 '
                      : 'px-4 py-3 border border-gray-400 '
                  }`,
                ),
              ]}>
              <Text
                style={[
                  tailwind(
                    `font-bold font-12 ${
                      props.is_captain ? 'text-brown-5' : 'text-light'
                    }`,
                  ),
                ]}>
                {props.is_captain ? '2x' : 'C'}
              </Text>
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              style={[ss.point, dT ? clr.td2 : clr.tdgray]}>
              {props.c}
            </Text>
          </View>

          <View
            style={[
              tailwind(`flex-col justify-center items-center`),
              {flex: 5},
            ]}>
            <TouchableOpacity
              onPress={() => props.viceCaptainSelect(props.player_key)}
              style={[
                tailwind(
                  `rounded-3xl ${
                    props.is_vice_captain
                      ? 'bg-secondary px-2 py-3'
                      : ' p-3 border border-gray-400'
                  }
                  
                  `,
                ),
              ]}>
              <Text
                style={[
                  tailwind(
                    `font-bold  text-light  ${
                      props.is_vice_captain
                        ? 'text-brown-5 font-10'
                        : 'text-light font-10'
                    }`,
                  ),
                ]}>
                {props.is_vice_captain ? '1.5x' : 'VC'}
              </Text>
            </TouchableOpacity>

            <Text
              numberOfLines={1}
              style={[ss.point, dT ? clr.td2 : clr.tdgray]}>
              {props.vc}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const TeamTag = (props: any) => {
  return (
    <View
      style={[tailwind('absolute bottom-0.5 rounded-t flex-row items-center')]}>
      <View
        style={[
          tailwind('rounded-tl flex-row items-center'),
          {
            backgroundColor: props.is_team_a ? '#244785' : '#70211E',
            paddingHorizontal: 2,
            paddingVertical: 1,
          },
        ]}>
        <Text
          style={[tailwind('font-regular uppercase font-9  text-light'), {}]}>
          {props.teamname}
        </Text>
      </View>
      <View style={[tailwind('bg-white rounded-tr')]}>
        {props.seasonRole === 'keeper' && (
          <Text
            style={[
              tailwind('font-regular uppercase font-9  text-light'),
              {
                paddingHorizontal: 2,
                paddingVertical: 1,
                color: '#244785',
              },
            ]}>
            WK
          </Text>
        )}

        {props.seasonRole === 'batsman' && (
          <Text
            style={[
              tailwind('font-regular uppercase font-9  text-light'),
              {
                paddingHorizontal: 2,
                paddingVertical: 1,
                color: '#244785',
              },
            ]}>
            BAT
          </Text>
        )}
        {props.seasonRole === 'all_rounder' && (
          <Text
            style={[
              tailwind('font-regular uppercase font-9  text-light'),
              {
                paddingHorizontal: 2,
                paddingVertical: 1,
                color: '#244785',
              },
            ]}>
            AR
          </Text>
        )}
        {props.seasonRole === 'bowler' && (
          <Text
            style={[
              tailwind('font-regular uppercase font-9  text-light'),
              {
                paddingHorizontal: 2,
                paddingVertical: 1,
                color: '#244785',
              },
            ]}>
            BOWL
          </Text>
        )}
      </View>
    </View>
  );
};

const ss = StyleSheet.create({
  dRoot: {
    paddingHorizontal: 16,
    borderColor: 'rgba(31, 41, 55,1)',
    borderTopWidth: 1,
    backgroundColor: '#172338',
  },
  lRoot: {
    paddingHorizontal: 16,
    borderColor: 'rgba(31, 41, 55,0.1)',
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontFamily: 'gadugi-bold',
    fontSize: 14,
    paddingVertical: 4,
  },
  point: {
    fontFamily: 'gadugi-normal',
    fontSize: 14,
    paddingVertical: 4,
  },
});
