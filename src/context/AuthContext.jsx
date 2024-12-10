import {createContext, useState} from 'react'

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState('')
    const [category, setCategory] = useState([])
    const [admin, setAdmin] = useState(false)
    const [blockBtn, setBlockBtn] = useState(false)

    return (
        <AuthContext.Provider
            value={{user, setUser, category, setCategory, admin, setAdmin, blockBtn, setBlockBtn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider