package com.example.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 用户信息表
 * </p>
 *
 * @author 
 * @since 2023-11-26
 */
@Getter
@Setter
  @TableName("sys_user")
@ApiModel(value = "User对象", description = "用户信息表")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

      @ApiModelProperty("用户ID")
        @TableId(value = "user_id", type = IdType.AUTO)
      private Long userId;

      @ApiModelProperty("部门ID")
      private Long deptId;

      @ApiModelProperty("用户账号")
      private String userName;

      @ApiModelProperty("用户昵称")
      private String nickName;

      @ApiModelProperty("用户类型（00系统用户）")
      private String userType;

      @ApiModelProperty("用户邮箱")
      private String email;

      @ApiModelProperty("手机号码")
      private String phonenumber;

      @ApiModelProperty("用户性别（0男 1女 2未知）")
      private String sex;

      @ApiModelProperty("头像地址")
      private String avatar;

      @ApiModelProperty("密码")
      private String password;

      @ApiModelProperty("帐号状态（0正常 1停用）")
      private String status;

      @ApiModelProperty("删除标志（0代表存在 2代表删除）")
      private String delFlag;

      @ApiModelProperty("最后登录IP")
      private String loginIp;

      @ApiModelProperty("最后登录时间")
      private LocalDateTime loginDate;

      @ApiModelProperty("创建者")
      private String createBy;

      @ApiModelProperty("创建时间")
      private LocalDateTime createTime;

      @ApiModelProperty("更新者")
      private String updateBy;

      @ApiModelProperty("更新时间")
      private LocalDateTime updateTime;

      @ApiModelProperty("备注")
      private String remark;


}
