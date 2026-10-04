import { createContext, useState, useEffect } from "react";
import { Theme } from "../constants/Theme";
import { useColorScheme } from "react-native";
import * as SecureStore from 'expo-secure-store';

const AppContext = createContext({
    mode: 'system',
    effectiveMode: 'light',
    theme: Theme.colors.light,
    modeColors: Theme.colors.light,
    setMode: () => { },
    toggleTheme: () => { },
});

function AppProvider({ children }) {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState('system');
    const [doc, setDoc] = useState("");
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("");
    const [account, setAccount] = useState([]);
    const [preloader, setPreloader] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userInfo, setUserInfo] = useState({ image: null, first_name: "Circular", last_name: "Shopper", email: "shopper@circular.estate", wallets: [{ is_primary: 1, balance: 0 }] });

    useEffect(() => {
        const initApp = async () => {
            const saved = await SecureStore.getItemAsync('themeMode');
            if (saved) setMode(saved);
        };

        initApp();
    }, []);

    useEffect(() => {
        SecureStore.setItemAsync('themeMode', mode);
    }, [mode]);

    const effectiveMode = mode === 'system' ? (systemScheme || 'light') : mode;

    return (
        <AppContext.Provider value={{
            mode,
            setMode,
            effectiveMode,
            modeColors: Theme.colors[effectiveMode],
            toggleTheme: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
            doc, setDoc,
            docID, setDocID,
            account, setAccount,
            userUID, setUserUID,
            userInfo, setUserInfo,
            preloader, setPreloader,
            products, setProducts,
            cart, setCart,
            categories, setCategories,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };
