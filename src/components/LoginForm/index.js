import React from 'react'
import s from './styles.css'

export default function LoginForm(props) {

    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">

                <form onSubmit={props.handleLogin}>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                        <input type="password" id="password" className="fadeIn  third" name="login" placeholder="password" />
                            <button type="submit" className="fadeIn fourth" value="Log In" >login</button>
                    </form>


                            <div id="formFooter">
                                <a className="underlineHover" href="#">Forgot Password?</a>
                            </div>
      
                </div>
            </div>

     

    )
}
