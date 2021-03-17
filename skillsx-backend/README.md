# SkillsX Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# GrpahQl Server http://localhost:4000/graphql

<pre>
# signUp

mutation{
  signUp(
    firstName: "Muhammad"
    lastName: "Ahsan"
    email: "muhammad.ahsan@gmail.com"
    password: "12345"
    isActive: false
    role: "Software Engineer"
    phoneNo: "03044323809"
  ){
    _id
    firstName
    lastName
    email
    password
    isActive
    role
    phoneNo
  }
}

# find User By Id

query{
  findUserByID(_id: "604b5429ccf51b122b64fa96"){
    _id
    firstName
    lastName
    email
    password
    isActive
    role
    phoneNo
  }
}

# delete User By ID
mutation{
  deleteUserByID(_id: "604b4ff61a812511a69a72fe"){
    _id
    firstName
    lastName
    email
    password
    isActive
    role
    phoneNo
  }
}

# update User

mutation{
  updateUser(
    _id: "604b5429ccf51b122b64fa96"
    isActive: true
    firstName: "Muhammad"
    lastName: "Ahmad"
    email: "muhammad.ahmad@gmail.com"
    password: "12345"
    role: "Software Engineer"
    phoneNo:"03030303033"
  ){
    _id
    firstName
    lastName
    email
    password
    isActive
    role
    phoneNo
  }
}

# login
mutation{
  login(
    email:"muhammad.ahsan@gmail.com"
    password: "12345"
  ){
    lastName
    firstName
    email
    accessToken
    _id
  }
}

#all Users
query{
  allUsers{
    _id
    firstName
    lastName
    email
    password
    isActive
    role
    phoneNo
  }
}
</pre>
