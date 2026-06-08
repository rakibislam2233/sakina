import React from 'react'

interface ResetPasswordEmailTemplateProps {
    username: string;
    resetUrl: string;
    expiresInMinutes: string;
}

const ResetPasswordEmailTemplate = ({ username, resetUrl, expiresInMinutes }: ResetPasswordEmailTemplateProps) => {
  return (
    <div>
      <h1>Reset Your Password</h1>
      <p>Hi {username},</p>
      <p>You have requested to reset your password. Please click the link below to reset your password:</p>
      <a href={resetUrl}>Reset Password</a>
      <p>This link will expire in {expiresInMinutes} minutes.</p>
    </div>
  )
}

export default ResetPasswordEmailTemplate