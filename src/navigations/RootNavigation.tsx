import React, {useEffect} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import ErrorBoundary from '../sharedComponents/molecules/ErrorBoundary';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {DrawerNav} from './DrawerNavigation';
import {
  Auth,
  More,
  Contest,
  Leaderboard,
  Wallet,
  Match,
  SecondInningsContest,
} from './StackNavigations';

import InitialScreen from '../screens/app/InitialScreen';
import NotificationScreen from '../screens/user/NotificationScreen';
import ProfileEditScreen from '../screens/user/ProfileEditScreen';
import AccountProfileScreen from '../screens/user/AccountProfileScreen';

import HowToPlayScreen from '../screens/app/HowToPlayScreen';
import DailyLeaderBoardScreen from '../screens/leaderboard/DailyLeaderBoardScreen';

// import CompletedMatchScreen from '../screens/matches/CompletedMatchScreen';
import MonthlyLeaderBoardScreen from '../screens/leaderboard/MonthlyLeaderBoardScreen';

import PlayerProfileScreen from '../screens/contests/PlayerProfileScreen';

import InviteScreen from '../screens/user/InviteScreen';
import ReferredFriendsListScreen from '../screens/user/ReferredFriendsListScreen';
import UserGoalsScreen from '../screens/user/UserGoalsScreen';
import LeaderProfileScreen from '../screens/leaderboard/LeaderProfileScreen';
import AffliatedScreen from '../screens/user/AffliatedScreen';
import AchievementsScreen from '../screens/user/AchievementsScreen';
import LeaderBoardListsScreen from '../screens/leaderboard/LeaderBoardListsScreen';

import {useSelector} from 'react-redux';

const RootNavigator = createStackNavigator();
// const RootNavigator = createNativeStackNavigator();

const StackConfig = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default function RootNavigation() {

  // useEffect(() => {
  //   if (sessionState === true) {
  //     // block the screen, and show the session was ended,

  //     // force logut
  //   }
  // }, [sessionState]);

  return (
    <ErrorBoundary>
      <NavigationContainer theme={DarkTheme}>
        <Host>
          <RootNavigator.Navigator
            screenOptions={StackConfig}
            initialRouteName="InitialScreen">
            <RootNavigator.Screen
              component={InitialScreen}
              name="InitialScreen"
            />
            <RootNavigator.Screen component={Auth} name="Auth" />
            <RootNavigator.Screen component={DrawerNav} name="DrawerNav" />
            <RootNavigator.Screen component={More} name="More" />
            <RootNavigator.Screen component={Contest} name="Contest" />
            <RootNavigator.Screen
              component={SecondInningsContest}
              name="SecondInningsContest"
            />
            <RootNavigator.Screen component={Match} name="Match" />
            <RootNavigator.Screen component={Wallet} name="Wallet" />
            <RootNavigator.Screen component={Leaderboard} name="Leaderboard" />

            <RootNavigator.Screen
              name="InviteScreen"
              component={InviteScreen}
            />

            <RootNavigator.Screen
              component={NotificationScreen}
              name="NotificationScreen"
            />

            <RootNavigator.Screen
              component={LeaderBoardListsScreen}
              name="LeaderBoardListsScreen"
            />
            <RootNavigator.Screen
              component={MonthlyLeaderBoardScreen}
              name="MonthlyLeaderBoardScreen"
            />

            {/* <RootNavigator.Screen
            component={CompletedMatchScreen}
            name="CompletedMatchScreen"
          /> */}
            <RootNavigator.Screen
              component={ProfileEditScreen}
              name="ProfileEditScreen"
            />
            <RootNavigator.Screen
              component={AccountProfileScreen}
              name="AccountProfileScreen"
            />
            <RootNavigator.Screen
              component={AffliatedScreen}
              name="AffliatedScreen"
            />
            <RootNavigator.Screen
              component={AchievementsScreen}
              name="AchievementsScreen"
            />
            <RootNavigator.Screen
              component={LeaderProfileScreen}
              name="LeaderProfileScreen"
            />

            <RootNavigator.Screen
              component={HowToPlayScreen}
              name="HowToPlayScreen"
            />
            <RootNavigator.Screen
              component={ReferredFriendsListScreen}
              name="ReferredFriendsListScreen"
            />

            <RootNavigator.Screen
              component={DailyLeaderBoardScreen}
              name="DailyLeaderBoardScreen"
            />

            <RootNavigator.Screen
              component={UserGoalsScreen}
              name="UserGoalsScreen"
            />

            <RootNavigator.Screen
              component={PlayerProfileScreen}
              name="PlayerProfileScreen"
            />
          </RootNavigator.Navigator>
        </Host>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
