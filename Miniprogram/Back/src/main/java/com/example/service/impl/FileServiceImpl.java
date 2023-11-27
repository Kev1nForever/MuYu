package com.example.service.impl;

import com.example.entity.File;
import com.example.mapper.FileMapper;
import com.example.service.IFileService;
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
