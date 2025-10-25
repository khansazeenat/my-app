import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { COLORS } from '@/constants/colors';

type SafeScreenProps = {
  children?: React.ReactNode;
};


const SafeScreen = ({ children }: SafeScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ 
        flex: 1,
        paddingTop: insets.top,
        backgroundColor:COLORS.background1,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
