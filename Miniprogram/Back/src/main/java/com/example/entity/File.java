package com.example.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2023-11-25
 */
@Getter
@Setter
  @TableName("sys_file")
@ApiModel(value = "File对象", description = "")
public class File implements Serializable {

    private static final long serialVersionUID = 1L;

      private Integer id;

    private String name;

    private String type;

    private String url;

    private String md5;


}
