import React, { useContext } from 'react';
import { Text as CoreText } from 'react-native';
import { Theme } from '../constants/Theme';
import { AppContext } from '../utils/globalVariables';

export function Text({ children, style, allowFontScaling = false, ...props }) {
    const { modeColors } = useContext(AppContext);

    return (
        <CoreText
            allowFontScaling={allowFontScaling}
            style={[{ color: modeColors.text1, fontFamily: Theme.fonts.text400 }, style]}
            {...props}
        >
            {children}
        </CoreText>
    );
}
