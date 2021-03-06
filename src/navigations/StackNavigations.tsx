import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';

// Contests
import ContestListScreen from '../screens/contests/ContestListScreen';
import SI_ContestListsScreen from '../screens/contests/SI_ContestListsScreen';
import ContestInfoScreen from '../screens/contests/ContestInfoScreen';
import CreateContestScreen from '../screens/contests/CreateContestScreen';
import WinningsListScreen from '../screens/contests/WinningsListScreen';
import SwitchTeamScreen from '../screens/contests/SwitchTeamScreen';
import TeamSelectionScreen from '../screens/contests/TeamSelectionScreen';

import TeamPreviewScreen from '../screens/contests/TeamPreviewScreen';
import AccountProfileScreen from '../screens/user/AccountProfileScreen';
import CapSelectionScreen from '../screens/contests/CapSelectionScreen';
import NotificationScreen from '../screens/user/NotificationScreen';

// wallet screen imports
import WalletScreen from '../screens/wallet/WalletScreen';
import TransactionListScreen from '../screens/wallet/TransactionListScreen';
import ManagePaymentsScreen from '../screens/wallet/ManagePaymentsScreen';
import AddCashScreen from '../screens/wallet/AddCashScreen';
import VerifyAccountScreen from '../screens/wallet/VerifyAccountScreen';
import PaymentOptionScreen from '../screens/wallet/PaymentOptionScreen';
import WithdrawelScreen from '../screens/wallet/WithdrawelScreen';
import PanCardVerifyScreen from '../screens/wallet/PanCardVerifyScreen';
import BankVerifyScreen from '../screens/wallet/BankVerifyScreen';

// leaderboard stack screen

import LeaderBoardListsScreen from '../screens/leaderboard/LeaderBoardListsScreen';
import DailyLeaderBoardScreen from '../screens/leaderboard/DailyLeaderBoardScreen';
import MonthlyLeaderBoardScreen from '../screens/leaderboard/MonthlyLeaderBoardScreen';

// match screen imports
import MatchScreen from '../screens/matches/MatchScreen';
import ContestMatchScreen from '../screens/matches/ContestMatchScreen';
import MyMatchPlayerScreen from '../screens/matches/MyMatchPlayerScreen';

// Auth screens
import SignupScreen from '../screens/user/SignupScreen';

import FantasyTeamNameScreen from '../screens/leaderboard/FantasyTeamNameScreen';

import TeamFormationScreen from '../screens/contests/TeamFormationScreen';
import CompareTeamsScreen from '../screens/matches/CompareTeamsScreen';

import LoginScreen from '../screens/user/LoginScreen';
import OTPScreen from '../screens/user/OTPScreen';

import MoreScreen from '../screens/app/MoreScreen';
import AboutUsScreen from '../screens/app/AboutUsScreen';
import TermsScreen from '../screens/app/TermsScreen';
import FairPlayScreen from '../screens/app/FairPlayScreen';
import PrivacyPolicyScreen from '../screens/app/PrivacyPolicyScreen';

// import MyMatchesScreen from '../screens/matches/MyMatchesScreen';

import {CardStyleInterpolators} from '@react-navigation/stack';

const StackConfig = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const HomeStack = createStackNavigator();
const ContestStack = createStackNavigator();
const SiContestStack = createStackNavigator();
const WalletStack = createStackNavigator();
const LeaderBoardStack = createStackNavigator();
const MatchStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MoreStack = createStackNavigator();

export function Home(props: any) {
  return (
    <HomeStack.Navigator screenOptions={StackConfig}>
      <HomeStack.Screen
        name="TeamPreviewScreen"
        component={TeamPreviewScreen}
      />
      <HomeStack.Screen
        name="AccountProfileScreen"
        component={AccountProfileScreen}
      />
      <HomeStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <HomeStack.Screen
        name="TransactionListScreen"
        component={TransactionListScreen}
      />
    </HomeStack.Navigator>
  );
}

export function Contest(props: any) {
  return (
    <ContestStack.Navigator
      detachInactiveScreens={true}
      screenOptions={StackConfig}>
      <ContestStack.Screen
        name="ContestListScreen"
        component={ContestListScreen}
        initialParams={props.route}
      />

      <ContestStack.Screen
        component={ContestInfoScreen}
        name="ContestInfoScreen"
      />
      <ContestStack.Screen
        component={CreateContestScreen}
        name="CreateContestScreen"
      />
      <ContestStack.Screen
        component={WinningsListScreen}
        name="WinningsListScreen"
      />

      <ContestStack.Screen
        name="SwitchTeamScreen"
        component={SwitchTeamScreen}
      />
      <ContestStack.Screen
        name="TeamFormationScreen"
        component={TeamFormationScreen}
      />
      <ContestStack.Screen
        name="CapSelectionScreen"
        component={CapSelectionScreen}
      />

      <ContestStack.Screen
        name="TeamPreviewScreen"
        component={TeamPreviewScreen}
      />
      <ContestStack.Screen
        name="TeamSelectionScreen"
        component={TeamSelectionScreen}
      />
    </ContestStack.Navigator>
  );
}

export function SecondInningsContest(props: any) {
  return (
    <SiContestStack.Navigator
      detachInactiveScreens={true}
      screenOptions={StackConfig}>
      <SiContestStack.Screen
        name="SI_ContestListsScreen"
        component={SI_ContestListsScreen}
        initialParams={props.route}
      />

      <SiContestStack.Screen
        component={ContestInfoScreen}
        name="ContestInfoScreen"
      />
      <SiContestStack.Screen
        component={CreateContestScreen}
        name="CreateContestScreen"
      />
      <SiContestStack.Screen
        component={WinningsListScreen}
        name="WinningsListScreen"
      />

      <SiContestStack.Screen
        name="SwitchTeamScreen"
        component={SwitchTeamScreen}
      />
      <ContestStack.Screen
        name="TeamFormationScreen"
        component={TeamFormationScreen}
      />
      <SiContestStack.Screen
        name="CapSelectionScreen"
        component={CapSelectionScreen}
      />

      <SiContestStack.Screen
        name="TeamPreviewScreen"
        component={TeamPreviewScreen}
      />
      <SiContestStack.Screen
        name="TeamSelectionScreen"
        component={TeamSelectionScreen}
      />
    </SiContestStack.Navigator>
  );
}

export function Wallet(props: any) {
  return (
    <WalletStack.Navigator screenOptions={StackConfig}>
      <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
      <WalletStack.Screen name="AddCashScreen" component={AddCashScreen} />
      <WalletStack.Screen
        name="TransactionListScreen"
        component={TransactionListScreen}
      />
      <WalletStack.Screen
        name="PaymentOptionScreen"
        component={PaymentOptionScreen}
      />
      <WalletStack.Screen
        component={ManagePaymentsScreen}
        name="ManagePaymentsScreen"
      />
      <WalletStack.Screen
        name="WithdrawelScreen"
        component={WithdrawelScreen}
      />
      <WalletStack.Screen
        name="VerifyAccountScreen"
        component={VerifyAccountScreen}
      />
      <WalletStack.Screen
        name="PanCardVerifyScreen"
        component={PanCardVerifyScreen}
      />
      <WalletStack.Screen
        name="BankVerifyScreen"
        component={BankVerifyScreen}
      />
    </WalletStack.Navigator>
  );
}

export function Match(props: any) {
  return (
    <MatchStack.Navigator
      initialRouteName={'MatchScreen'}
      screenOptions={StackConfig}>
      <MatchStack.Screen
        name="MatchScreen"
        component={MatchScreen}
        initialParams={props.route.params}
      />

      <MatchStack.Screen
        name="ContestMatchScreen"
        component={ContestMatchScreen}
      />
      <MatchStack.Screen
        name="CompareTeamsScreen"
        component={CompareTeamsScreen}
      />
      <MatchStack.Screen
        name="MyMatchPlayerScreen"
        component={MyMatchPlayerScreen}
      />
    </MatchStack.Navigator>
  );
}

export function Leaderboard(props: any) {
  return (
    <LeaderBoardStack.Navigator screenOptions={StackConfig}>
      <LeaderBoardStack.Screen
        name="LeaderBoardListsScreen"
        component={LeaderBoardListsScreen}
      />
      <LeaderBoardStack.Screen
        name="DailyLeaderBoardScreen"
        component={DailyLeaderBoardScreen}
      />
      <LeaderBoardStack.Screen
        name="MonthlyLeaderBoardScreen"
        component={MonthlyLeaderBoardScreen}
      />
    </LeaderBoardStack.Navigator>
  );
}

export function Auth(props: any) {
  return (
    <AuthStack.Navigator screenOptions={StackConfig}>
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
      <AuthStack.Screen
        name="FantasyTeamNameScreen"
        component={FantasyTeamNameScreen}
      />
    </AuthStack.Navigator>
  );
}

export function More(props: any) {
  return (
    <MoreStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="MoreScreen">
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} />
      <MoreStack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <MoreStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <MoreStack.Screen name="FairPlayScreen" component={FairPlayScreen} />
      <MoreStack.Screen name="TermsScreen" component={TermsScreen} />
    </MoreStack.Navigator>
  );
}
