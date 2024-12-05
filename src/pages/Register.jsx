import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
    const { user } = useUserContext();

    useRedirectActiveUser(user, "/dashboard");

    const onSubmit = async (
        { email, password, confirmPassword },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            await register({ email, password });
            console.log("user registered");
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/email-already-in-use") {
                setErrors({ email: "Email esta en uso" });
            }
        } finally {
            setSubmitting(false);
        }
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no válido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Mínimo 6 caracteres").required("Password requerido"),
        confirmPassword: Yup.string().trim().min(6, "Mínimo 6 caracteres").oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required("Confirmar contraseña es requerido"),
    });
    return (
        <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
            <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
                <PersonAddIcon/>
            </Avatar>
            <Typography variant='h5' component="h1">
                Register
            </Typography>

            <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    isSubmitting,
                    errors,
                    touched,
                    handleBlur,
                }) => (
                    <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
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
                            placeholder="password"
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
                        <TextField
                            type="password"
                            placeholder="Confirme Contraseña"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            onBlur={handleBlur}
                            id='confirmPassword'
                            label="Ingrese su Contraseña"
                            fullWidth
                            sx={{ mb: 3 }}
                            errors={errors.confirmPassword}
                            helperText={errors.confirmPassword && touched.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                        />
                        <LoadingButton
                            type="submit"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                            sx={{mb:3}}
                        >
                            Registrate
                        </LoadingButton>
                        <Button
                            fullWidth
                            component={Link}
                            to='/'
                        >
                            ¿Ya tienes Cuenta? Ingresa
                        </Button>
                    </Box>)}
            </Formik>
        </Box>
    );
};
export default Register;