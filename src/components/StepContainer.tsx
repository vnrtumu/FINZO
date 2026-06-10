import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../theme';

interface StepContainerProps {
  children: React.ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});

export default StepContainer;
