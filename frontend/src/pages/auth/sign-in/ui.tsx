import { SignInForm } from 'features/auth/sign-in'
import { withAuthLayout } from 'widgets/layouts/auth'

const SignInPage = async () => {
  return (
    <div className="flex min-h-screen grow items-center justify-center">
      <SignInForm />
    </div>
  )
}

export default withAuthLayout(SignInPage)
