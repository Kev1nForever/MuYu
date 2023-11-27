package com.example.service.impl;

import com.example.entity.User;
import com.example.mapper.UserMapper;
import com.example.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户信息表 服务实现类
 * </p>
 *
 * @author 
 * @since 2023-11-26
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
