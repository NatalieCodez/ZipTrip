import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CurvedContainer({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: '#004C9D',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          padding: 20,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}