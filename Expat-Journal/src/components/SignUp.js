import React, {useState} from 'react';
import * as yup from 'yup'
import styled from 'styled-components';

const schema = yup.object().shape({
    username: yup.string().required('Please enter your username.').min(3,'Not real name'),
    email: yup.string().required('Please enter your email.').matches(/^[0-9]{10}$/),
    password: yup.string().required('Please enter your password.').min(8,),
    comfirmpassword: yup.string().required('Please recomfirm your password.').min(8,),
}
)
    


const defaultFormState = {
    username: '',
    email: '',
    password: '',
    comfirmpassword: '',

}
const defaultErrorState= {

}

const SignUp = props => {
    const [formState,setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const[isDisable, setIsDisable] = useState(true);

    const validate = e =>{
        yup.reach(schema, e.target.username).validate(e.target.value,)
        .then(valid => setErrors({...errors, [e.target.username]:''}))
        .catch(err => setErrors({...errors,[e.target.username]:err.errors[0]}))
    }



 // redo the handle 
    const handleChange = e => {
        if (e.target.type ==='textkbox'){
            setFormState({
                ...formState,
                [e.target.username]: e.target.value
            })
        }
        if (e.target.username === 'username' || e.target.email === 'email') {
            validate(e);
        }
    }

    const handleSumbmit = e =>{
        e.preventDefault();
        console.log(formState)
    }
    return (
        <FormContainer>
            <form onSubmit={handleSumbmit}>
            <h1>Sign up Now!</h1>
            <fieldset>
            <label>
                User Name <input type='text' name='username' onChange={handleChange} data-cy='username' value={formState.username} />
                {errors.username > 0 && <p style={{color:'red'}}>{errors.username}</p> }
            </label>
            <label>
                Password <input type='text' name='password' onChange={handleChange} data-cy='password' value={formState.password} />
            </label>
            <label>
            Comfirm Password <input type='text' name='comfirm_password' onChange={handleChange} data-cy='comfirmpassword' value={formState.comfirmpassword} />
            </label>
            </fieldset>
            <button type='cancel'> Cancel </button>
            <button type='submit'> Submit </button>
        <div>
            <p>Have an account?</p>
            
        </div>
            </form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
margin: 5rem, auto;
width: 600px;
`


export default SignUp; 


// axios post request "off/login" end points