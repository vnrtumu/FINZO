import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../theme';

interface CreditGaugeProps {
  score: number;
  maxScore?: number;
  label?: string;
}

const CreditGauge: React.FC<CreditGaugeProps> = ({
  score,
  maxScore = 900,
  label = 'Credit Score',
}) => {
  const percentage = Math.min(score / maxScore, 1);
  const getScoreColor = () => {
    if (percentage >= 0.75) {return Colors.success;}
    if (percentage >= 0.5) {return Colors.warning;}
    return Colors.error;
  };
  const getScoreLabel = () => {
    if (percentage >= 0.75) {return 'Excellent';}
    if (percentage >= 0.6) {return 'Good';}
    if (percentage >= 0.5) {return 'Fair';}
    return 'Poor';
  };

  const scoreColor = getScoreColor();

  return (
    <View style={styles.container}>
      <View style={styles.gaugeOuter}>
        <View style={styles.gaugeInner}>
          <Text style={[styles.score, {color: scoreColor}]}>{score}</Text>
          <Text style={styles.scoreLabel}>{getScoreLabel()}</Text>
        </View>
        {/* Decorative ring segments */}
        <View style={[styles.ringSegment, styles.ringTop, {backgroundColor: scoreColor}]} />
        <View style={[styles.ringSegment, styles.ringRight, {backgroundColor: `${scoreColor}60`}]} />
        <View style={[styles.ringSegment, styles.ringBottom, {backgroundColor: `${scoreColor}30`}]} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.maxScore}>out of {maxScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gaugeOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gaugeInner: {
    alignItems: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: Typography.bold,
  },
  scoreLabel: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ringSegment: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ringTop: {
    top: -4,
    left: '50%',
    marginLeft: -4,
  },
  ringRight: {
    right: -4,
    top: '50%',
    marginTop: -4,
  },
  ringBottom: {
    bottom: -4,
    left: '50%',
    marginLeft: -4,
  },
  label: {
    fontSize: Typography.caption,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  maxScore: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
});

export default CreditGauge;
