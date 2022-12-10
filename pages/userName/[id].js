import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import NavBar from '../../components/Navbar/Navbar'
import Head from 'next/head'
import EditEmpDetails from '../../components/EmpForm/EditEmpDetails'
export const getStaticPaths = async () => {
  let response = await fetch('http://localhost:3000/api/employee')
   response = await response.json()
  const data = response && response.data ? response.data : []
  const paths = data && data.map((item) => {
    return {
      params: {
        id: item._id.toString()
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(`http://localhost:3000/api/employee/${id}`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
const EditUser = ({data}) => {

  return (
    <>
      <Head><title>User</title></Head>
      <NavBar />
      <EditEmpDetails empDetails={data}/>
    </>
  )
}
export default EditUser;