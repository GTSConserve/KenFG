import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tailwind from '../../../tailwind';
import assets from '../../constants/assets_manifest';
//@ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomBottomTab({state, descriptors, navigation}: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={tailwind('flex flex-row py-1 bg-secondary items-center')}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // console.log(route);
            try {
              navigation.navigate(route.state.routeNames[0]);
            } catch {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{flex: 1, paddingVertical: 2}}>
            <View
              style={tailwind(
                'flex flex-col justify-center items-center',
              )}>
              {index === 0 ? (
                <Icon
                  name="home-sharp"
                  color={isFocused ? '#172339' : '#7e6b2d'}
                  size={isFocused ? 25 : 20}
                />
              ) : index === 1 ? (
                <Icon
                  name="trophy-sharp"
                  color={isFocused ? '#172339' : '#7e6b2d'}
                  size={isFocused ? 25 : 20}
                />
              ) : index === 2 ? (
                <Icon
                  name="medal-sharp"
                  color={isFocused ? '#172339' : '#7e6b2d'}
                  size={isFocused ? 25 : 20}
                />
              ) : (
                <Icon
                  name="ellipsis-horizontal-sharp"
                  color={isFocused ? '#172339' : '#7e6b2d'}
                  size={isFocused ? 25 : 20}
                />
              )}
              <Text
                style={[
                  tailwind(
                    `text-white text-center uppercase pt-1  font-bold  ${
                      isFocused
                        ? 'text-red-600 font-11'
                        : 'text-secondary font-10'
                    }`,
                  ),
                  {color: `${isFocused ? '#172339' : '#7e6b2d'}`},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
