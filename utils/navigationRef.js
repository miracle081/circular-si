import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params, reset = false) {
    if (navigationRef.isReady()) {
        if (reset) {
            navigationRef.reset({
                index: 0,
                routes: [{ name, params }],
            });
        } else {
            navigationRef.navigate(name, params);
        }
    }
}
