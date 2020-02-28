import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field, yupToFormErrors } from 'formik';

let Registration = ({values, errors, status, touched }) => {
    let [newReg, setNewReg] = useState([]);

    useEffect (() => {
        console.log('status change', status )
        status&&setNewReg (newReg => [...newReg, status])
    }, [status]);

    console.log(values)
    return (
        <div className='reg-form'>
            <Form>
                <Field id='name' type='text' name='name' placeholder='Name' value={values.name}/>
                {touched.name && errors.name && ( <p>{errors.name}</p>)}
                <Field id='email' type='text' name='email' placeholder='E-mail' value={values.email}/>
                {touched.email && errors.email && ( <p>{errors.email}</p>)}
                <Field id='password' type='password' name='password' placeholder='Password' value={values.password}/>
                {touched.password && errors.password && ( <p>{errors.password}</p>)}
                <Field id='tos' type='checkbox' name='tos' checked={values.tos}/>
                <button type='submit'>Submit</button>
            </Form>
            {newReg.map(reg => (
                <div key={reg.id} className='return-form'>
                    <p>Name: {reg.name}</p>
                    <p>E-mail: {reg.email}</p>
                    <p>ToS: {reg.tos}</p>
                </div>
            ))}
        </div>
    );
}

let FormikRegistration = withFormik({
    mapPropsToValues({ name, email, password, vaccinations }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            vaccinations: vaccinations || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name field required'),
        email: Yup.string().required('E-mail field required'),
        password: Yup.string().required('Password field required'),
    }),
    handleSubmit(values, {setStatus, resetForm}){
        console.log('submitting', values)
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('success', res)
            setStatus(res.data)
            resetForm();
        })
        .catch(err => console.log(err.res))
    }
})(Registration);

export default FormikRegistration;