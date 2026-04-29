import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerContent from './DrawerContent';

// Drawer screens
import HomeScreen from '../screens/HomeScreen';
import MembersScreen from '../screens/MembersScreen';
import B2BMatchmakingScreen from '../screens/B2BMatchmakingScreen';
import Members4MembersScreen from '../screens/Members4MembersScreen';
import EventsScreen from '../screens/EventsScreen';
import MarketEntryScreen from '../screens/MarketEntryScreen';
import SESExpertsScreen from '../screens/SESExpertsScreen';
import ClustersScreen from '../screens/ClustersScreen';
import NetworksScreen from '../screens/NetworksScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Detail screens
import BusinessDetailScreen from '../screens/detail/BusinessDetailScreen';
import EventDetailScreen from '../screens/detail/EventDetailScreen';
import ClusterDetailScreen from '../screens/detail/ClusterDetailScreen';
import NetworkDetailScreen from '../screens/detail/NetworkDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 300 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Members" component={MembersScreen} />
      <Drawer.Screen name="B2B" component={B2BMatchmakingScreen} />
      <Drawer.Screen name="M4M" component={Members4MembersScreen} />
      <Drawer.Screen name="Events" component={EventsScreen} />
      <Drawer.Screen name="MarketEntry" component={MarketEntryScreen} />
      <Drawer.Screen name="SES" component={SESExpertsScreen} />
      <Drawer.Screen name="Clusters" component={ClustersScreen} />
      <Drawer.Screen name="Networks" component={NetworksScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="BusinessDetail" component={BusinessDetailScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ClusterDetail" component={ClusterDetailScreen} />
      <Stack.Screen name="NetworkDetail" component={NetworkDetailScreen} />
    </Stack.Navigator>
  );
}
