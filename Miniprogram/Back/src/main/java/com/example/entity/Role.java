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
 * 角色信息表
 * </p>
 *
 * @author 
 * @since 2023-11-26
 */
@Getter
@Setter
  @TableName("sys_role")
@ApiModel(value = "Role对象", description = "角色信息表")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

      @ApiModelProperty("角色ID")
        @TableId(value = "role_id", type = IdType.AUTO)
      private Long roleId;

      @ApiModelProperty("角色名称")
      private String roleName;

      @ApiModelProperty("角色权限字符串")
      private String roleKey;

      @ApiModelProperty("显示顺序")
      private Integer roleSort;

      @ApiModelProperty("数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）")
      private String dataScope;

      @ApiModelProperty("菜单树选择项是否关联显示")
      private Boolean menuCheckStrictly;

      @ApiModelProperty("部门树选择项是否关联显示")
      private Boolean deptCheckStrictly;

      @ApiModelProperty("角色状态（0正常 1停用）")
      private String status;

      @ApiModelProperty("删除标志（0代表存在 2代表删除）")
      private String delFlag;

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
