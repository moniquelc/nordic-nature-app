import {TextField, Grid, Link} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Logo} from '../components/Logo'
import {PrimaryButton} from '../components/Buttons'
import './styles.scss'

const schema = object().shape({
  email: string().email().required('Please insert your email address'),
  password: string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Please type in your password'),
})

type FormInput = {
  email: string
  password: string
}

export const SignIn = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>({resolver: yupResolver(schema)})

  const onSubmit = () => navigate('/home')

  return (
    <div className="container">
      <div className="content-container">
        <Logo mode="dark" />
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              {...register('email')}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin="normal"
              {...register('password')}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
            <PrimaryButton text="Sign In" type="submit" fullWidth />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="primary.dark">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="primary.dark">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  )
}
