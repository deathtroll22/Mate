import * as React from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Timer from './screens/Timer';
import Chat from './screens/Chat';
import Activities from './screens/Activities';
import Recap from './screens/Recap';
import Settings from './screens/Settings';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Tab = createBottomTabNavigator();

export default function App() {
  const fadeAnim = new Animated.Value(0);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const screenOptions = {
    cardStyle: { backgroundColor: 'transparent' },
    // ... autres options que vous pourriez vouloir ajouter
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(async () => {
      // Pause avant l'animation de fondu sortant
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Animation de fondu sortant
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Durée de l'animation de fondu sortant
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        // Modifier l'état à la fin de l'animation
        setMenuVisible(true);
      });
    });
  }, []);
  

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      {menuVisible ? (
        <NavigationContainer
        >
        <Tab.Navigator
        initialRouteName="Timer" // Définissez "Timer" comme onglet initial
          screenOptions={({ route }) => ({
      
            headerShown: false,
            tabBarStyle: {
              height: 70,
              marginHorizontal: 5,
              marginBottom: 14,
              paddingTop: 30,
              borderRadius: 30,
              backgroundColor: 'rgba(28,30,34,1)',
              position: 'absolute',
              borderTopWidth: 0,
            },
            tabBarLabel: () => null, // Supprimer les labels du menu
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconSize = size;
              
              if (route.name === 'Chat') {
                iconName = focused ? require('./assets/img/MenuIcons/icon1.png') : require('./assets/img/MenuIcons/icon1.png');
              } else if (route.name === 'Activities') {
                iconName = focused ? require('./assets/img/MenuIcons/icon2.png') : require('./assets/img/MenuIcons/icon2.png');
              } else if (route.name === 'Timer') {
                iconName = focused ? require('./assets/img/MenuIcons/icon3.png') : require('./assets/img/MenuIcons/icon3.png');
              } else if (route.name === 'Recap') {
                iconName = focused ? require('./assets/img/MenuIcons/icon4.png') : require('./assets/img/MenuIcons/icon4.png');
              } else if (route.name === 'Settings') {
                iconName = focused ? require('./assets/img/MenuIcons/icon5.png') : require('./assets/img/MenuIcons/icon5.png');
              }
              
              // Ajuster la taille de l'icône pour l'onglet du milieu
              if (route.name === 'Timer') {
                iconSize = 45; // Ajuster la taille de l'icône ici
              }
              
              // ajuster la taille de l'icône pour les autres onglets
              if (route.name === 'Chat' || route.name === 'Activities' || route.name === 'Recap' || route.name === 'Settings') {
                iconSize = 35; // Ajuster la taille de l'icône ici
              }
              return <Image source={iconName} style={{ width: iconSize, height: iconSize }} />;
            },
          })}
     
        >
          <Tab.Screen name="Chat" component={Chat} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Activities" component={Activities} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Timer" component={Timer} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Recap" component={Recap} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: () => null }} />
        </Tab.Navigator>
      </NavigationContainer>
  ) : (
    <LinearGradient colors={['#1A237E', '#64B5F6']} style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeAnim,
        }}
      >
        <Image source={require('./assets/img/MateAppLogos/rsz_1matelogowhite.png')} style={{ width: 200, height: 80 }} />
      </Animated.View>
    </LinearGradient>
  )}
</View>
);
}
