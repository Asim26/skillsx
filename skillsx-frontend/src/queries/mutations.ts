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

//updateUser
export const updateUser = gql`
  mutation updateUserDetails($_id: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!, $isActive: Boolean!, $phoneNo: String!) {
    updateUser(_id: $_id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, isActive: $isActive, phoneNo: $phoneNo){
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

//fetchUserById
export const findUserByID = gql`
  query findUserByID($_id: String!) {
    findUserByID(_id:$_id){
      firstName
      lastName
      email
      phoneNo
    }
  }
`

//fetchAllUsers
export const allUsers = gql`
  query allUsers {
    allUsers{
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


//fetchAllCategories
export const fetchCategories = gql`
  query fetchCategories {
    fetchCategories{
    _id
    title
    description
    isActive
    isDeleted
    createdAt
    updatedAt
    }
  }
`