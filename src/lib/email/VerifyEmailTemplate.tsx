import React from 'react'
interface VerifyEmailTemplateProps {
  username: string;
  verifyUrl: string;
}

const VerifyEmailTemplate = ({ username, verifyUrl }: VerifyEmailTemplateProps) => {
  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>Hi {username},</p>
      <p>Please click the link below to verify your email address:</p>
      <a href={verifyUrl}>Verify Email</a>
    </div>
  )
}

export default VerifyEmailTemplate