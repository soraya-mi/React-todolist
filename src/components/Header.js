import React, { useContext } from 'react'
import AuthContext from '../auth-context'

const Header = (props) => {

    const auth = useContext(AuthContext)

    return(
        <div>
            {auth.status ? (
                <button onClick={props.onLoadTodos} className="btn btn-dark my-3">Todo List</button>
            ) : null}
        </div>
    )
}

export default Header