"use client";
import UserprotectedRoute from '@/components/Utils/userProtectedRoute'
import matrimonial from '@/components/user/matrimonial/Matrimonial'
import React from 'react'

const page = () => {
  return (
    <matrimonial/>
  )
}

export default UserprotectedRoute(page)