import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../theme';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </Text>
        <Text style={styles.labelText}>
          {stepLabels[currentStep - 1] || ''}
        </Text>
      </View>
      <View style={styles.trackContainer}>
        {Array.from({length: totalSteps}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              index < currentStep ? styles.segmentActive : styles.segmentInactive,
              index === 0 && styles.segmentFirst,
              index === totalSteps - 1 && styles.segmentLast,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepText: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  labelText: {
    fontSize: Typography.small,
    color: Colors.primaryStart,
    fontWeight: Typography.semiBold,
  },
  trackContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  segmentActive: {
    backgroundColor: Colors.primaryStart,
  },
  segmentInactive: {
    backgroundColor: Colors.border,
  },
  segmentFirst: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  segmentLast: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});

export default ProgressHeader;
