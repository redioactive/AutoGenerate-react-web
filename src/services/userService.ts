import { request } from '@umijs/max';

/**
 * 用户注册
 * @param params
 * */
export async function userRegister(params: UserType.UserRegisterRequest) {
  return request<BaseResponse<number>>('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
/**
 * 用户登录
 * @param params
 * */
export async function userLogin(params: UserType.UserLoginRequest) {
  return request<BaseResponse<UserType.UserVO>>('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 用户注销
 * */
export async function userLogout() {
  return request<BaseResponse<boolean>>('/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
  });
}

/**
 * 用户匿名登录
 * */
export async function userLoginAnonymous() {
  return request<BaseResponse<UserType.UserVO>>('/users/login/Anonymous', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
  });
}

/**
 * 创建用户
 * @param params
 * */
export async function addUser(params: UserType.UserAddRequest) {
  return request<BaseResponse<number>>('/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
/**
 * 删除用户
 * @param params
 * */
export async function deleteUser(params: UserType.UserDeleteRequest) {
  return request<BaseResponse<boolean>>('/users/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 更新用户
 * @param params
 * */
export async function updateUser(params: UserType.UserUpdateRequest) {
  return request<BaseResponse<boolean>>('/users/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据id获取用户
 * @param id
 * */
export async function getUserById(id: number) {
  return request<BaseResponse<UserType.UserVO>>('/users/get', {
    method: 'GET',
    params: { id },
  });
}

/**
 * 获取当前登录用户
 * */
export async function getLoginUser() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('没找到token');
  }
  return request<BaseResponse<UserType.UserVO>>('/users/get/login', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

/**
 * 分页获取用户列表
 * @param params
 */
export async function listUserByPage(params: UserType.UserQueryRequest) {
  return request<BaseResponse<PageInfo<UserType.UserVO[]>>>('/users/list', {
    method: 'GET',
    params,
  });
}
