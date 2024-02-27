import React, { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const {children} = props;
    // data su dung chung
    const [isLogin, setIsLogin] = useState(false);
    const [infoUser, setinfoUser] = useState({});
    return(
        <AppContext.Provider value={{isLogin, setIsLogin,infoUser,setinfoUser}}>
            {children}
        </AppContext.Provider>
    )
};

