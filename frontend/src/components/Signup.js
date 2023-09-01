import { useState } from "react";
import { signupFields as fields } from "../constants/formFields";
import FormAction from "./Form/FormAction";
import Input from "./Form/Input";
import { registerUser } from '../redux/User/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='')
const Signup = () => {
    const { error } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupState, setSignupState] = useState(fieldsState);
    const handleChange = (e) => {
        if(e.target.id === 'profilePicture'){
            setSignupState({...signupState,[e.target.id]:e.target.files[0]})
        } else {
        setSignupState({...signupState,[e.target.id]:e.target.value})}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await dispatch(registerUser(signupState));
        if (user.payload) {
          localStorage.setItem('token', user.payload);
          navigate('/home', { replace: true });
        }
      };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field => 
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            accept={field.accept}
                        />)
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Signup"/>
            {error&&(
                <div className="p-4 mb-4 text-sm font-medium text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-600" role="alert">
                    {error}
              </div>
            )}
        </form>
    )
}
export default Signup;