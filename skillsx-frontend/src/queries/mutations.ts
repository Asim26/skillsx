import { gql } from '@apollo/client';

//userLogin
export const loginUser = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password){
      _id
      firstName
      lastName
      email
      accessToken
    }
  }
`

//registerUser
export const registerUser = gql`
  mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $isActive: Boolean!, $phoneNo: String!) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, isActive: $isActive, phoneNo: $phoneNo){
      _id
      firstName
      lastName
      email
      password
      isActive
      phoneNo    
    }
  }
`