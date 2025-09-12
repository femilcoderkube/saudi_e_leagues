import { setLogin } from "../app/slices/constState/constStateSlice";

class MobileEvent {
    static onLogin() {
        window.appLoginData = function (authToken, language, userData, deviceType) {
            console.log("Callback from App:", authToken, language, userData, deviceType);

            if (authToken) {
                localStorage.setItem("token", authToken);
            }
            if (deviceType) {
                localStorage.setItem("deviceType", deviceType);
            }
            if (language) {
                localStorage.setItem("lang", language);
            }
            if (userData) {
                localStorage.setItem("user", userData);
            }
        }
        window.dispatchEvent(new Event("appLoginDataReceived"));
    }
    static onLanguageChange(newLang) {
        const type = localStorage.getItem("deviceType");
        if (type === "mobile") {
            window.AndroidInterface?.languageCallbackHandler(newLang);
            window.webkit?.messageHandlers?.languageCallbackHandler?.postMessage(
                newLang
            );
        }
    }
    static onLoginClick(currentUrl, dispatch) {
        const type = localStorage.getItem("deviceType");
        if (type === "mobile") {
            window.AndroidInterface?.signInCallbackHandler(currentUrl);
            window.webkit?.messageHandlers?.signInCallbackHandler?.postMessage(currentUrl);
        } else {
            dispatch(setLogin(true));
        }
    }
}

export default MobileEvent;