import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";
import { Text } from "./AppText";
import { AppContext } from "../utils/globalVariables";

export const AppTextInput = ({
    label,
    rightIcon,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    touched,
    secureTextEntry = false,
    showPasswordToggle = false,
    onTogglePassword,
    iconName,
    keyboardType = "default",
    autoCapitalize = "sentences",
    autoComplete,
    ...props
}) => {
    const { modeColors } = React.useContext(AppContext);
    const styles = useStyle(modeColors);

    return (
        <View style={styles.inputGroup}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={modeColors.text2}
                    contentStyle={styles.inputContent}
                    underlineStyle={{ display: 'none' }}
                    activeUnderlineColor="transparent"
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    cursorColor={Theme.colors.primary}
                    right={rightIcon}
                    {...props}
                />
                {iconName && !showPasswordToggle && (
                    <Feather name={iconName} size={18} color={modeColors.text2} style={styles.icon} />
                )}
                {showPasswordToggle && (
                    <TouchableOpacity style={styles.icon} onPress={onTogglePassword}>
                        <Feather
                            name={secureTextEntry ? "eye-off" : "eye"}
                            size={18}
                            color={modeColors.text2}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {touched && error && <Text style={styles.fieldError}>{error}</Text>}
        </View>
    );
};

function useStyle(modeColors) {
    const styles = StyleSheet.create({
        inputGroup: { marginBottom: 15 },
        label: {
            fontSize: 14,
            fontFamily: Theme.fonts.text500,
            color: modeColors.text1,
            marginBottom: 5,
        },
        inputWrapper: { position: 'relative' },
        input: { backgroundColor: 'transparent', height: 45 },
        inputContent: {
            backgroundColor: modeColors.bg2,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: modeColors.line,
            fontSize: 14,
            paddingRight: 40,
            paddingLeft: 12,
            color: modeColors.text1,
        },
        icon: { position: 'absolute', right: 12, top: 14 },
        fieldError: { fontSize: 11, color: '#ff4444', marginTop: 3 },
    });
    return styles;
}
