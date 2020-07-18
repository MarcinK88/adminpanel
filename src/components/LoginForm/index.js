import React from 'react'

export default function LoginForm(props) {





    return (

        <div class="wrapper fadeInDown">
            <div id="formContent">

                <form onSubmit={props.handleLogin}>
                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" />
                        <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" />
                            <button type="submit" class="fadeIn fourth" value="Log In" >login</button>
                    </form>


                            <div id="formFooter">
                                <a class="underlineHover" href="#">Forgot Password?</a>
                            </div>
      
                </div>
            </div>

     

    )
}
