type User = {
  permissions: string[],
  roles: string[],
}

interface ValidateUserPermissionsParams {
  user:User,
  permissions?: string[],
  roles?: string[]
}

export function validateUserPermissions({ user, permissions, roles} : ValidateUserPermissionsParams){
  if(permissions?.length > 0){
    const hasAllPermissions = permissions?.every(permission => {
      return user.permissions.includes(permission)
    })




    if(!hasAllPermissions){
      return false
    }
}


if(roles?.length > 0){
  console.log(roles?.length > 0,'verifacando se roles tem uma quantidade maior que zero')
  const hasAllRoles = roles?.some(role => {

    return user.roles.includes(role)
  })

  console.log(hasAllRoles,'eacfhsrdjchv rburesuirvbujsebrfvuioseb u')

  
  if(!hasAllRoles){
    return false
  }
}

return true;
}