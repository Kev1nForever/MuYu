package com.qingge.springboot.service.impl;

import com.qingge.springboot.entity.File;
import com.qingge.springboot.mapper.FileMapper;
import com.qingge.springboot.service.IFileService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2023-11-25
 */
@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements IFileService {

}
