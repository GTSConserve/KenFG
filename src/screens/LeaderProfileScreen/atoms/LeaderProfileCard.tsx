import React from 'react';
import tailwind from '../../../../tailwind';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../constants/assets_manifest';
import {DownArrowIcon, RankIcon} from '../../../sharedComponents';

interface PropTypes {
  text?: string;
}

export default function UserProfileCard(props: PropTypes) {
  return (
    <View style={[tailwind('m-2 bg-dark-3 rounded')]}>
      <TopSection />
      <BottomSection />
    </View>
  );
}

const TopSection = () => {
  return (
    <View
      style={[
        tailwind(
          'border-b flex-row items-center justify-between border-gray-800 px-4 py-3',
        ),
      ]}>
      <View style={[tailwind('flex-row items-center')]}>
        <Image
          resizeMode="contain"
          source={assets.person}
          style={{
            width: 48,
            height: 48,
            // borderColor: 'yellow',
            // borderWidth: 2,
            // borderRadius: 100,
          }}
        />
        <View style={[tailwind('px-3')]}>
          <Text style={[tailwind('font-regular text-white font-14')]}>
            KAIRO
          </Text>
          <Text style={[tailwind('font-regular text-dark-1 font-14')]}>
            Level 45
          </Text>
        </View>
      </View>
      <View>
        <Text style={[tailwind('font-regular text-right text-dark-1 font-12')]}>
          WEEK 5
        </Text>
        <Text style={[tailwind('font-regular text-white font-14')]}>
          1 Nov to 7 Nov
        </Text>
      </View>
    </View>
  );
};

const BottomSection = () => {
  return (
    <View
      style={[
        tailwind(
          ' flex-row items-center justify-between border-gray-700 px-4 py-3',
        ),
      ]}>
      <View style={[tailwind('')]}>
        <Text style={[tailwind('font-regular text-dark-1 font-14')]}>
          POINTS
        </Text>
        <Text style={[tailwind('font-regular text-white font-14')]}>
          6434233
        </Text>
      </View>

      <View style={[tailwind('')]}>
        <View style={[tailwind('flex-row justify-end items-center')]}>
          <Text style={[tailwind('font-regular px-1 text-dark-1 font-14')]}>
            RANK
          </Text>
          <RankIcon golden={false} />
        </View>
        <View style={[tailwind('flex-row items-center')]}>
          <Text style={[tailwind('font-regular text-white p-1 font-14')]}>
            6434233
          </Text>
          <DownArrowIcon />
        </View>
      </View>
    </View>
  );
};
