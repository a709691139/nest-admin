/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50743
 Source Host           : localhost:3306
 Source Schema         : nestjs

 Target Server Type    : MySQL
 Target Server Version : 50743
 File Encoding         : 65001

 Date: 05/09/2023 11:40:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo_one
-- ----------------------------
DROP TABLE IF EXISTS `demo_one`;
CREATE TABLE `demo_one`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `age` int(11) NOT NULL,
  `momeny` decimal(10, 0) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `date1` date NULL DEFAULT NULL,
  `datetime1` datetime NULL DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of demo_one
-- ----------------------------
INSERT INTO `demo_one` VALUES ('ad60890f-7f4f-48c1-af00-c03db6db00c2', '1234', 0, 0, NULL, '001', '2023-07-15', '2023-07-18 01:00:00', '2023-07-14 02:17:07.450335', '2023-07-14 02:17:07.450335');
INSERT INTO `demo_one` VALUES ('ae8627e9-ae08-4a8a-958c-1e126cfcae9a', '1234', 0, 0, NULL, '001', '2023-07-15', '2023-07-18 01:00:00', '2023-07-14 02:15:11.316419', '2023-07-14 02:15:11.316419');
INSERT INTO `demo_one` VALUES ('c2f66204-4ec6-4c8d-bf28-d2b71bcaa594', '123', 0, 0, NULL, '001', '2023-07-15', '2023-07-18 01:00:00', '2023-07-14 02:14:22.470296', '2023-07-14 02:14:52.674651');
INSERT INTO `demo_one` VALUES ('d3feba20-cd25-4c42-8d02-9459e52d102b', '1234', 0, 0, NULL, '001', '2023-07-15', '2023-07-18 01:00:00', '2023-07-14 02:17:00.789766', '2023-07-14 02:17:00.789766');

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('001', '2023-08-30 03:21:19.519025', '2023-08-30 03:21:19.519025', '6975cce4-942c-49db-ae55-4d0fdf3d8686', 'bool', 'bool', NULL);

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item`  (
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dictId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sortNo` double NULL DEFAULT 1 COMMENT '排序',
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态：0禁用 1启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d3b250cf3cf827b56103cab2f33`(`dictId`) USING BTREE,
  CONSTRAINT `FK_d3b250cf3cf827b56103cab2f33` FOREIGN KEY (`dictId`) REFERENCES `sys_dict` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------
INSERT INTO `sys_dict_item` VALUES ('001', '2023-08-30 03:23:06.974742', '2023-08-30 03:23:06.974742', '35177e16-8deb-4078-a9c1-96325556a6a1', '6975cce4-942c-49db-ae55-4d0fdf3d8686', '否', '0', NULL, 2, '1');
INSERT INTO `sys_dict_item` VALUES ('001', '2023-08-30 03:23:06.967466', '2023-08-30 03:23:06.967466', '36c2ea65-dae4-414e-9864-c356115b436a', '6975cce4-942c-49db-ae55-4d0fdf3d8686', '是', '1', NULL, 1, '1');

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission`  (
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '前端组件名',
  `menuType` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限)',
  `perms` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单权限编码',
  `sortNo` double NULL DEFAULT 1 COMMENT '菜单排序',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `isKeepAlive` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否缓存路由',
  `isHidden` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否隐藏路由',
  `nsleft` int(11) NOT NULL DEFAULT 1,
  `nsright` int(11) NOT NULL DEFAULT 2,
  `redirect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转地址',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_e8accc6334cdf4e3de9f7c4a426`(`parentId`) USING BTREE,
  CONSTRAINT `FK_e8accc6334cdf4e3de9f7c4a426` FOREIGN KEY (`parentId`) REFERENCES `sys_permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('001', '2023-08-01 08:14:33.522819', '2023-08-28 09:22:14.900972', '1', NULL, '顶层', NULL, '/', NULL, '0', NULL, 1, NULL, '0', '0', 1, 78, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.837195', '2023-08-22 08:00:59.476832', '1be94069-f720-4d99-9f8d-752173e156a5', '2-2', '查询详情', NULL, NULL, NULL, '2', 'sys_permission:get', 1, NULL, '0', '0', 32, 33, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:23:42.647492', '2023-08-28 09:22:14.900972', '2', '1', '系统管理', NULL, '/system', NULL, '0', NULL, 1, NULL, '0', '0', 8, 73, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:24:24.131339', '2023-08-22 08:00:59.476832', '2-1', '2', '用户管理', NULL, '/system/amis/SystemUser', 'AmisPage', '1', NULL, 1, NULL, '0', '0', 9, 28, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:25:09.829926', '2023-08-22 08:00:59.476832', '2-2', '2', '菜单管理', NULL, '/system/amis/SystemPermission', 'AmisPage', '1', NULL, 1, NULL, '0', '0', 29, 42, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 03:52:11.746803', '2023-08-22 08:00:59.476832', '2-3', '2', '角色管理', NULL, '/system/amis/SystemRole', 'AmisPage', '1', NULL, 1, NULL, '0', '0', 43, 58, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.749823', '2023-08-28 09:17:11.749823', '2e7e3afa-fb52-48f8-a936-7a21cfa220c3', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '查询列表', NULL, NULL, NULL, '2', 'sys_dict:page', 1, NULL, '0', '0', 60, 61, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:25:28.084968', '2023-08-28 09:22:14.900972', '3', '1', 'AmisPage', NULL, '/system/amis/1', 'AmisPage', '0', NULL, 1, NULL, '0', '0', 74, 75, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.834619', '2023-08-22 08:00:59.476832', '338cb760-013d-4909-955e-d24c2a3bdf9e', '2-3', '删除', NULL, NULL, NULL, '2', 'sys_role:remove', 1, NULL, '0', '0', 52, 53, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.829485', '2023-08-22 08:00:59.476832', '37e4193d-86a5-447b-801b-0c2f625bfda0', '2-3', '编辑', NULL, NULL, NULL, '2', 'sys_role:update', 1, NULL, '0', '0', 50, 51, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:25:52.000872', '2023-08-28 09:22:14.900972', '4', '1', 'amis编辑器', NULL, '/amis-editor', 'AmisEditPage', '0', NULL, 1, NULL, '0', '0', 76, 77, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.839345', '2023-08-22 08:00:59.476832', '440f1ffe-265e-46be-9f12-b7c138ad0374', '2-3', '导出excel', NULL, NULL, NULL, '2', 'sys_role:export_excel', 1, NULL, '0', '0', 54, 55, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.539546', '2023-08-21 09:28:45.000000', '4fb15caa-3b8a-4a62-ae15-3fd72d3ba907', '2-1', '查询列表', NULL, NULL, NULL, '2', 'sys_user:page', 1, NULL, '0', '0', 10, 11, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:14:12.348320', '2023-08-28 09:28:21.000000', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '2', '系统字典', NULL, '/system/amis/SystemDict', 'AmisPage', '1', NULL, 5, '', '', '0', 59, 72, '');
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.818307', '2023-08-22 08:00:59.476832', '57327be4-29bd-4b58-91f5-11322eea56ce', '2-3', '查询详情', NULL, NULL, NULL, '2', 'sys_role:get', 1, NULL, '0', '0', 46, 47, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.824399', '2023-08-22 08:00:59.476832', '585a2247-02bc-4039-865a-4026f7f92965', '2-3', '新增', NULL, NULL, NULL, '2', 'sys_role:create', 1, NULL, '0', '0', 48, 49, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-22 08:00:59.478712', '2023-08-22 08:00:59.478712', '623fdcf8-782c-4a64-8c82-8a6c06a708a6', '2-1', '重置密码', NULL, NULL, NULL, '2', 'sys_user:resetPassword', 4, NULL, '0', '0', 26, 27, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.548632', '2023-08-19 06:59:20.959946', '62b29d5f-5f86-41d2-813d-719c1362e6d3', '2-1', '新增', NULL, NULL, NULL, '2', 'sys_user:create', 1, NULL, '0', '0', 14, 15, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.553222', '2023-08-19 06:59:25.631744', '6c506ebb-6c29-4033-8e6c-54f4d01decfd', '2-1', '编辑', NULL, NULL, NULL, '2', 'sys_user:update', 1, NULL, '0', '0', 16, 17, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.770544', '2023-08-28 09:17:11.770544', '6e12b153-ce1a-4a42-8c4b-f439ff687e2b', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '导出excel', NULL, NULL, NULL, '2', 'sys_dict:export_excel', 1, NULL, '0', '0', 70, 71, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.840851', '2023-08-22 08:00:59.476832', '6e2614e4-ec4d-4750-a8ce-60fe2e39a26d', '2-2', '新增', NULL, NULL, NULL, '2', 'sys_permission:create', 1, NULL, '0', '0', 34, 35, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 07:44:30.811553', '2023-08-22 08:00:59.476832', '7b2442f3-ea81-40c4-996c-eb7003a35b76', '2-3', '查询列表', NULL, NULL, NULL, '2', 'sys_role:page', 1, NULL, '0', '0', 44, 45, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 11:01:12.567552', '2023-08-21 11:01:12.567552', '82292e86-4053-4f07-984d-4550e9b09544', '2-1', '启用或冻结用户', NULL, NULL, NULL, '2', 'sys_user:updateStatus', 2, NULL, '0', '0', 22, 23, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.562475', '2023-08-19 06:55:27.731567', '90a39acf-c53b-454a-8f38-d1e71b5ad9cc', '2-1', '导出excel', NULL, NULL, NULL, '2', 'sys_user:export_excel', 1, NULL, '0', '0', 20, 21, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-22 03:39:19.910929', '2023-08-22 03:39:19.910929', '9c9fb589-2352-45de-9e83-f1107be398a3', '2-1', '分配角色', NULL, NULL, NULL, '2', 'sys_user:updateRoles', 3, NULL, '0', '0', 24, 25, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-21 13:19:13.184774', '2023-08-22 08:00:59.476832', '9e1ea755-9c30-4d8f-bac9-2d53a31577a8', '2-3', '修改权限', NULL, NULL, NULL, '2', 'sys_role:update_permissions', 2, NULL, '0', '0', 56, 57, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.759119', '2023-08-28 09:17:11.759119', 'a16bc5da-9791-4559-9051-9201fa7a0f56', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '新增', NULL, NULL, NULL, '2', 'sys_dict:create', 1, NULL, '0', '0', 64, 65, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.558575', '2023-08-19 06:59:28.793488', 'b2aa4c76-7269-48ad-ae8d-10b696cdef07', '2-1', '删除', NULL, NULL, NULL, '2', 'sys_user:remove', 1, NULL, '0', '0', 18, 19, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.847421', '2023-08-22 08:00:59.476832', 'c0920b33-5ef1-462a-9ed1-c4a10ea7d045', '2-2', '编辑', NULL, NULL, NULL, '2', 'sys_permission:update', 1, NULL, '0', '0', 36, 37, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:53:57.544977', '2023-08-19 06:59:32.026100', 'c18386ef-c4ba-48bb-9eba-ff8c1903067f', '2-1', '查询详情', NULL, NULL, NULL, '2', 'sys_user:get', 1, NULL, '0', '0', 12, 13, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.830325', '2023-08-22 08:00:59.476832', 'c33ff9b9-dd78-4bf2-ae32-61478712442c', '2-2', '查询列表', NULL, NULL, NULL, '2', 'sys_permission:page', 1, NULL, '0', '0', 30, 31, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.754777', '2023-08-28 09:17:11.754777', 'd69ff0e7-ef35-4a2b-ba77-e071b115cf91', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '查询详情', NULL, NULL, NULL, '2', 'sys_dict:get', 1, NULL, '0', '0', 62, 63, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.762300', '2023-08-28 09:17:11.762300', 'e0de11c2-963c-42d6-a079-fae736413ae8', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '编辑', NULL, NULL, NULL, '2', 'sys_dict:update', 1, NULL, '0', '0', 66, 67, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.861981', '2023-08-22 08:00:59.476832', 'eeef6d57-83cd-4307-80c3-f0f126e5701c', '2-2', '导出excel', NULL, NULL, NULL, '2', 'sys_permission:export_excel', 1, NULL, '0', '0', 40, 41, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-19 06:58:09.853855', '2023-08-22 08:00:59.476832', 'efa8c266-43c4-4fb2-a88f-d21ee595e763', '2-2', '删除', NULL, NULL, NULL, '2', 'sys_permission:remove', 1, NULL, '0', '0', 38, 39, NULL);
INSERT INTO `sys_permission` VALUES ('001', '2023-08-28 09:17:11.766556', '2023-08-28 09:17:11.766556', 'fa239196-011a-4bed-8077-b2694632d71a', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92', '删除', NULL, NULL, NULL, '2', 'sys_dict:remove', 1, NULL, '0', '0', 68, 69, NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `code` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_cf51756dc07761fea6b351e061`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('001', '2023-07-25 10:08:16.434187', '2023-08-21 07:39:36.357046', NULL, '1', '管理员', 'string', 'string');
INSERT INTO `sys_role` VALUES ('001', '2023-07-21 08:55:59.439664', '2023-08-21 07:39:32.241291', NULL, '2', 'string', 'admin', NULL);

-- ----------------------------
-- Table structure for sys_role_sys_permission_relate
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_sys_permission_relate`;
CREATE TABLE `sys_role_sys_permission_relate`  (
  `role_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permission_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`) USING BTREE,
  INDEX `IDX_33322ebbc1789e204ad0a9db76`(`role_id`) USING BTREE,
  INDEX `IDX_8f2d233239a635a21d73ee2454`(`permission_id`) USING BTREE,
  CONSTRAINT `FK_33322ebbc1789e204ad0a9db765` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8f2d233239a635a21d73ee2454c` FOREIGN KEY (`permission_id`) REFERENCES `sys_permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_sys_permission_relate
-- ----------------------------
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '1');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '1be94069-f720-4d99-9f8d-752173e156a5');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '2');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '2-1');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '2-2');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '2-3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '2e7e3afa-fb52-48f8-a936-7a21cfa220c3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '338cb760-013d-4909-955e-d24c2a3bdf9e');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '37e4193d-86a5-447b-801b-0c2f625bfda0');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '4');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '440f1ffe-265e-46be-9f12-b7c138ad0374');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '4fb15caa-3b8a-4a62-ae15-3fd72d3ba907');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '4fd3ebab-182c-41b0-9300-2b2a95bcdf92');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '57327be4-29bd-4b58-91f5-11322eea56ce');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '585a2247-02bc-4039-865a-4026f7f92965');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '623fdcf8-782c-4a64-8c82-8a6c06a708a6');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '62b29d5f-5f86-41d2-813d-719c1362e6d3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '6c506ebb-6c29-4033-8e6c-54f4d01decfd');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '6e12b153-ce1a-4a42-8c4b-f439ff687e2b');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '6e2614e4-ec4d-4750-a8ce-60fe2e39a26d');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '7b2442f3-ea81-40c4-996c-eb7003a35b76');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '82292e86-4053-4f07-984d-4550e9b09544');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '90a39acf-c53b-454a-8f38-d1e71b5ad9cc');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '9c9fb589-2352-45de-9e83-f1107be398a3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', '9e1ea755-9c30-4d8f-bac9-2d53a31577a8');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'a16bc5da-9791-4559-9051-9201fa7a0f56');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'b2aa4c76-7269-48ad-ae8d-10b696cdef07');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'c0920b33-5ef1-462a-9ed1-c4a10ea7d045');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'c18386ef-c4ba-48bb-9eba-ff8c1903067f');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'c33ff9b9-dd78-4bf2-ae32-61478712442c');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'd69ff0e7-ef35-4a2b-ba77-e071b115cf91');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'e0de11c2-963c-42d6-a079-fae736413ae8');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'eeef6d57-83cd-4307-80c3-f0f126e5701c');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'efa8c266-43c4-4fb2-a88f-d21ee595e763');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('1', 'fa239196-011a-4bed-8077-b2694632d71a');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '1');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '1be94069-f720-4d99-9f8d-752173e156a5');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '2');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '2-1');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '2-2');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '2-3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '4');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '4fb15caa-3b8a-4a62-ae15-3fd72d3ba907');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '62b29d5f-5f86-41d2-813d-719c1362e6d3');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '6c506ebb-6c29-4033-8e6c-54f4d01decfd');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '6e2614e4-ec4d-4750-a8ce-60fe2e39a26d');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', '90a39acf-c53b-454a-8f38-d1e71b5ad9cc');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'b2aa4c76-7269-48ad-ae8d-10b696cdef07');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'c0920b33-5ef1-462a-9ed1-c4a10ea7d045');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'c18386ef-c4ba-48bb-9eba-ff8c1903067f');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'c33ff9b9-dd78-4bf2-ae32-61478712442c');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'eeef6d57-83cd-4307-80c3-f0f126e5701c');
INSERT INTO `sys_role_sys_permission_relate` VALUES ('2', 'efa8c266-43c4-4fb2-a88f-d21ee595e763');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `tenantId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '001',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱地址',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机',
  `avatar` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `alias` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '别名',
  `gender` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '性别 0：未知、1：男、2：女',
  `realName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `signature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '签名',
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '用户状态: 0禁用 1启用',
  `departIds` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '负责部门id列表: 用,隔开',
  `workNo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工号：唯一',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_4091ee2066b930cfcb0a1e7342`(`avatar`) USING BTREE,
  UNIQUE INDEX `IDX_7bef5cdb09432b1dfc46a063ce`(`phone`) USING BTREE,
  UNIQUE INDEX `IDX_54d58bc1ef6c34f9e2917b3152`(`phone`, `tenantId`) USING BTREE,
  UNIQUE INDEX `IDX_9273a58be974fc8fa6449c0bf4`(`email`, `tenantId`) USING BTREE,
  UNIQUE INDEX `IDX_1cf700796bd1203fc09073ecfe`(`username`, `tenantId`) USING BTREE,
  UNIQUE INDEX `IDX_d25a795fe819a0718a0c88b6d7`(`workNo`, `tenantId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('002', '2023-07-19 08:28:51.124761', '2023-07-19 08:28:51.124761', NULL, '2', '2', NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, '1', NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-07-19 10:10:12.784028', '2023-08-28 01:53:27.000000', '2023-08-28 01:53:27.000000', '2d870bca-9013-4268-ad9b-571e505d0f0f', '11', NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, '$2a$10$NKYPFLND9iGHYQs/i6lj0epDrVwLm9cKAgk2dlXX1zPMB7JsZk/GC');
INSERT INTO `sys_user` VALUES ('001', '2023-07-19 08:29:01.367272', '2023-08-28 01:53:29.000000', '2023-08-28 01:53:29.000000', '3', '3', NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-08-22 03:35:54.267303', '2023-08-28 01:53:32.000000', '2023-08-28 01:53:32.000000', '31d4a28c-7f97-4782-9f5b-a8cc72de5c23', NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-08-25 10:32:48.538587', '2023-08-28 01:53:34.000000', '2023-08-28 01:53:34.000000', '3a20c042-f939-4b7a-8247-b56c31a4fe5a', NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-08-25 10:33:39.094112', '2023-08-28 01:53:36.000000', '2023-08-28 01:53:36.000000', '6bd0cb80-5e44-4ea0-a040-a0503fb7cf39', NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-07-19 09:10:13.000000', '2023-08-30 10:20:42.000000', NULL, '807a58ac-c7ad-4cad-ac12-4c745e200e00', 'string', NULL, NULL, NULL, NULL, '0', NULL, NULL, '0', NULL, NULL, 'string');
INSERT INTO `sys_user` VALUES ('001', '2023-08-25 10:28:28.790261', '2023-08-25 10:28:28.790261', NULL, '9b51402d-8f68-47a8-bd1e-577184b95c58', NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-07-19 08:23:38.000000', '2023-08-22 08:01:41.000000', NULL, 'admin', 'admin', NULL, NULL, 'http://localhost:3000/static/upload/aec198b1-22a9-4716-a8d3-3b3e14311c7a.jpg', NULL, '0', NULL, NULL, '1', NULL, '1', '$2a$10$jMYZIMVqJfxZopQ8Ux/DbeeUfPTcxkm7J4EmNB878d1BGPz.DBe/K');
INSERT INTO `sys_user` VALUES ('001', '2023-08-25 10:30:00.082588', '2023-08-25 10:30:00.082588', NULL, 'bfd4e221-f534-4367-a00d-8e76104bc10d', NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-08-28 01:31:21.567844', '2023-08-28 01:31:21.567844', NULL, 'd00d9b5f-f1ef-4e42-bed5-64fb193974c4', '233', NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES ('001', '2023-09-01 03:26:04.375416', '2023-09-01 03:26:04.375416', NULL, 'e786b127-28ef-40d4-8ceb-f599f9017bbb', '1', NULL, NULL, NULL, NULL, '0', NULL, NULL, '1', NULL, NULL, '$2a$10$vlS3oyyORvneBi/3nrRAoOt.GBSRvUu30osX89q/fJj9L/b2TH6ve');

-- ----------------------------
-- Table structure for sys_user_sys_role_relate
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_sys_role_relate`;
CREATE TABLE `sys_user_sys_role_relate`  (
  `user_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `IDX_d322013bcac47d1d050091f29e`(`user_id`) USING BTREE,
  INDEX `IDX_8f8dd019d3b56f83e8e2a461a7`(`role_id`) USING BTREE,
  CONSTRAINT `FK_8f8dd019d3b56f83e8e2a461a7d` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d322013bcac47d1d050091f29ef` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_sys_role_relate
-- ----------------------------
INSERT INTO `sys_user_sys_role_relate` VALUES ('807a58ac-c7ad-4cad-ac12-4c745e200e00', '1');
INSERT INTO `sys_user_sys_role_relate` VALUES ('807a58ac-c7ad-4cad-ac12-4c745e200e00', '2');
INSERT INTO `sys_user_sys_role_relate` VALUES ('admin', '1');

SET FOREIGN_KEY_CHECKS = 1;
