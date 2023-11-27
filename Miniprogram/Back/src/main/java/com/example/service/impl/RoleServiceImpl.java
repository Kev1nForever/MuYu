package com.example.service.impl;

import com.example.entity.Role;
import com.example.mapper.RoleMapper;
import com.example.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 角色信息表 服务实现类
 * </p>
 *
 * @author 
 * @since 2023-11-26
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

}
