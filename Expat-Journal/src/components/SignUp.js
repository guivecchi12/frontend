import React, {useState} from 'react';


const defaultFormState = {
    user_name: '',
    email: '',
    password: '',
    comfirm_password: '',

}
const defaultErrorState= {

}

const SignUp = props => {
    const [formState,setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const[isDisable, setIsDisable] = useState(true);
 // redo the handle 
    const handleChange = e => {
        if (e.target.type ==='textkbox'){
            setFormState({
                ...formState,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSumbmit = e =>{
        e.preventDefault();
        console.log(formState)
    }
    return (
        <div>
            <form onSubmit={handleSumbmit}>
            <h3>Sign up Now!</h3>
            <label>
                <fieldset>
                User Name <input type='text' name='user_name' onChange={handleChange} data-cy='full_name' value={formState.user_name} />
                </fieldset>
            </label>
            <label>
                <fieldset>
                Password <input type='text' name='password' onChange={handleChange} data-cy='password' value={formState.password} />
                </fieldset>
            </label>
            <label>
            <fieldset>
            Comfirm Password <input type='text' name='comfirm_password' onChange={handleChange} data-cy='comfirm_password' value={formState.comfirm_password} />
               </fieldset>
            </label>
            <button type='cancel'> Cancel </button>
            <button type='submit'> Comfirm </button>
            </form>
        </div>
    );
}
export default SignUp; 


// axios post request "off/login" end points