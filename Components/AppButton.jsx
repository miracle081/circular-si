import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme } from "../constants/Theme";
import { Text } from "./AppText";

export function AppButton({ disabled, textStyle, onPress, children, style, textColor, buttonColor, icon }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.7}
            onPress={onPress}
            style={[
                styles.btn,
                { backgroundColor: buttonColor || Theme.colors.primary },
                style,
                disabled && styles.disabled,
            ]}
        >
            <View style={styles.content}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={[styles.text, { color: textColor || "white" }, textStyle]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    disabled: {
        opacity: 0.6,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginRight: 6,
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: Theme.fonts.text600,
    },
});
