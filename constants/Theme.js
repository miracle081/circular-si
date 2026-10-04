import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const responsiveMultiplier = (() => {
    const base = width / 375;
    const minMultiplier = 0.9;
    const maxMultiplier = 1.15;
    return Math.min(Math.max(base, minMultiplier), maxMultiplier);
})();

const normalize = (size) => {
    const newSize = size * responsiveMultiplier;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const Theme = {
    colors: {
        primary: '#F97316',
        primaryLight: '#FFF7ED',
        primaryLight2: '#FED7AA',
        primaryStrong: '#EA580C',
        primaryDark: '#C2410C',

        secondary: '#111827',
        secondaryLight: '#F9FAFB',

        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',

        yellow: '#FACC15',
        red: '#EF4444',
        blue: '#2563EB',
        green: '#22C55E',

        layer: '#F9FAFB',
        bg: '#FFFFFF',
        bg2: '#F3F4F6',
        text1: '#111827',
        text2: '#6B7280',
        line: '#E5E7EB',

        light: {
            layer: '#F9FAFB',
            bg: '#FFFFFF',
            bg2: '#F3F4F6',
            text1: '#111827',
            text2: '#6B7280',
            line: '#E5E7EB',
        },
        dark: {
            layer: '#111827',
            bg: '#030712',
            bg2: '#1F2937',
            text1: '#FFFFFF',
            text2: '#9CA3AF',
            line: '#374151',
        },
    },

    fonts: {
        brand: 'Manrope_800ExtraBold',
        text200: 'Manrope_200ExtraLight',
        text300: 'Manrope_300Light',
        text400: 'Manrope_400Regular',
        text500: 'Manrope_500Medium',
        text600: 'Manrope_600SemiBold',
        text700: 'Manrope_700Bold',
        text800: 'Manrope_800ExtraBold',
    },

    sizes: {
        xxs: normalize(7),
        xs: normalize(10),
        sm: normalize(12),
        md: normalize(14),
        lg: normalize(16),
        xl: normalize(18),
        xxl: normalize(22),
        h3: normalize(20),
        h2: normalize(24),
        h1: normalize(28),
        heroEmoji: normalize(52),
        icon: {
            xs: normalize(16),
            sm: normalize(20),
            md: normalize(24),
            lg: normalize(32),
        },
        padding: normalize(16),
        borderRadius: normalize(8),
    },

    spacing: {
        xs: normalize(4),
        sm: normalize(8),
        md: normalize(12),
        lg: normalize(16),
        xl: normalize(24),
        xxl: normalize(32),
        xxxl: normalize(40),
    },

    normalize,
};
