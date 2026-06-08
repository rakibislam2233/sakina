import React from 'react'
interface WelcomeEmailTemplateProps {
  username: string;
}

const WelcomeEmailTemplate = ({ username }: WelcomeEmailTemplateProps) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Hi {username},</p>
      <p>Thank you for signing up!</p>
    </div>
  )
}

export default WelcomeEmailTemplate