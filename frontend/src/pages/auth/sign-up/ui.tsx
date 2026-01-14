import { SignUpForm } from 'features/auth/sign-up'
import { withAuthLayout } from 'widgets/layouts/auth'

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen grow items-center justify-center">
      <SignUpForm />
    </div>
  )
}

export default withAuthLayout(SignUpPage)
