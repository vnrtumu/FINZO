import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import {Colors, Typography} from '../theme';

interface StyledInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  error,
  icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.primaryStart],
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>
      <Animated.View
        style={[
          styles.inputWrapper,
          {borderColor},
          error ? styles.inputError : null,
        ]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          placeholderTextColor={Colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Animated.View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: Typography.medium,
  },
  labelFocused: {
    color: Colors.primaryStart,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  inputError: {
    borderColor: Colors.error,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: 54,
    paddingHorizontal: 16,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    fontWeight: Typography.regular,
  },
  inputWithIcon: {
    paddingLeft: 12,
  },
  errorText: {
    fontSize: Typography.small,
    color: Colors.error,
    marginTop: 6,
    marginLeft: 4,
  },
});

export default StyledInput;
