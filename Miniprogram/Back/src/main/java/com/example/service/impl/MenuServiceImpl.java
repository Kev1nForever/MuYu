package com.example.service.impl;

import com.example.entity.Menu;
import com.example.mapper.MenuMapper;
import com.example.service.IMenuService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 菜单权限表 服务实现类
 * </p>
 *
 * @author 
 * @since 2023-11-26
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements IMenuService {

}
