import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

type ProgressBarProps = {
  step: number; // 1, 2, or 3
  totalSteps?: number; // default 3
};

const ProgressBar = ({ step, totalSteps = 3 }: ProgressBarProps) => {
  const progressPercent = (step / totalSteps) * 100;

  return (
    <View style={{ marginVertical: 20 }}>
      {/* Outer bar */}
      <View
        style={{
          width: '100%',
          height: 8,
          backgroundColor: COLORS.background2,
          borderRadius: 4,
        }}
      >
        {/* Filled bar */}
        <View
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: COLORS.primary,
            borderRadius: 4,
          }}
        />
      </View>

      {/* Tiny tip under the left side */}
      <Text style={{ fontSize: 12, color: COLORS.placeHolderText, marginTop: 4 ,textAlign: 'right'}}>
        Step {step} of {totalSteps}
      </Text>
    </View>
  );
};

export default ProgressBar;
