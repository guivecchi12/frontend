import React, {useState} from 'react';


const defaultFormState = {
    full_name: '',
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

    const handleChange = e => {
        if (e.target.type ==='checkbox'){
            setFormState({
                ...formState,
                toppings:{
                    ...formState.toppings,
                    [e.target.value]: e.target.checked
                }
            })
        } else {
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
                Full Name <input type='text' name='full_name' onChange={handleChange} data-cy='full_name' value={formState.full_name} />
                </fieldset>
            </label>
            <label>
            <fieldset>
               Email <input type='text' name='email' onChange={handleChange} data-cy='email' value={formState.email} />
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