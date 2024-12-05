import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {
    const { user } = useUserContext();

    useRedirectActiveUser(user, "/dashboard");

    const onSubmit = async ({ email, password }, { setSubmitting, setErrors, resetForm }) => {
        console.log({ email, password })
        try {
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message)
            if (error.code === "auth/invalid-login-credentials") {
                return setErrors({ email: "Usuario y/o contraseña no valido" })
            }
            if (error.code === "auth/too-many-requests") {
                return setErrors({ password: "Muchos intentos fallidos, Intenta de nuevo mas tarde" })
            }
        } finally {
            setSubmitting(false)
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password Requerido")
    });
    return (
        <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
            <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
                <LoginIcon/>
            </Avatar>
                <Typography variant='h5' component="h1">
                    Login
                </Typography>
                
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        ({
                            values,
                            handleSubmit,
                            handleChange,
                            errors,
                            touched,
                            handleBlur,
                            isSubmitting,
                        }) => (
                            <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component="form">
                                <TextField
                                    type="text"
                                    placeholder="test@example.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                    onBlur={handleBlur}
                                    id='email'
                                    label="Ingrese Email"
                                    fullWidth
                                    sx={{ mb: 3 }}
                                    errors={errors.email && touched.email}
                                    helperText={errors.email && touched.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                />
                                <TextField
                                    type="password"
                                    placeholder="Ingrese su Contraseña"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                    onBlur={handleBlur}
                                    id='password'
                                    label="Ingrese su Contraseña"
                                    fullWidth
                                    sx={{ mb: 3 }}
                                    errors={errors.password && touched.password}
                                    helperText={errors.password && touched.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                                />
                                <LoadingButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                    variant="contained"
                                    fullWidth
                                    sx={{mb:3}}
                                >
                                    ACCEDER
                                </LoadingButton>
                                <Button
                                    fullWidth
                                    component={Link}
                                    to='/register'
                                >¿No tienes Cuenta? Register Now</Button>
                            </Box>
                        )}
                </Formik>
        </Box>
    );
};
export default Login;