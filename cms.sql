/*
 Navicat Premium Data Transfer

 Source Server         : Loaclhost
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : cms

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 23/08/2018 14:56:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` bigint(20) NOT NULL,
  `modify_time` bigint(20) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (4, '3楼~~~~', 1534769453660, 1534769453660, 11, 1);
INSERT INTO `comments` VALUES (5, '4楼~~~~', 1534769456463, 1534769456463, 12, 1);
INSERT INTO `comments` VALUES (6, '5楼~~~~', 1534769461159, 1534769461159, 1, 1);
INSERT INTO `comments` VALUES (7, '6楼~~~~', 1534769468649, 1534769468649, 2, 1);
INSERT INTO `comments` VALUES (8, '7楼~~~~', 1534769471315, 1534769471315, 3, 1);
INSERT INTO `comments` VALUES (10, '10楼', 1534769476799, 1534771089730, 5, 1);
INSERT INTO `comments` VALUES (11, '11楼~~~', 1534771233628, 1534771243070, 5, 11);
INSERT INTO `comments` VALUES (12, '对不起，我是9号', 1534909667609, 1534909667609, 9, 1);
INSERT INTO `comments` VALUES (13, '对不起，我是9号', 1534910104794, 1534910104794, 9, 1);
INSERT INTO `comments` VALUES (14, '我想，这次应该成功了哒', 1534910219038, 1534910219038, 9, 1);
INSERT INTO `comments` VALUES (15, '我可以在评论一次吗', 1534910355869, 1534910355869, 9, 1);
INSERT INTO `comments` VALUES (16, '在添加一条回复9号的试试', 1534911336318, 1534911336318, 9, 1);
INSERT INTO `comments` VALUES (17, '我就试试看看评论是否正常', 1534911746496, 1534911746496, 9, 1);
INSERT INTO `comments` VALUES (18, '牛逼，我是一楼', 1534911879560, 1534911879560, 20, 1);
INSERT INTO `comments` VALUES (19, '我是二楼', 1534911884067, 1534911884067, 20, 1);
INSERT INTO `comments` VALUES (20, '牛逼', 1534926525101, 1534926525101, 20, 21);

-- ----------------------------
-- Table structure for topics
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of topics
-- ----------------------------
INSERT INTO `topics` VALUES (2, '今天天气阴2', '确实不错2', 1, '2018-08-20 08:45:22', '2018-08-20 08:45:22');
INSERT INTO `topics` VALUES (3, '今天天气阴3', '确实不错3', 1, '2018-08-20 08:59:12', '2018-08-20 08:59:12');
INSERT INTO `topics` VALUES (4, '今天天气阴4', '确实不错4', 1, '2018-08-20 09:20:44', '2018-08-20 09:20:44');
INSERT INTO `topics` VALUES (5, '今天天气阴5', '确实不错5', 1, '2018-08-20 09:20:51', '2018-08-20 09:20:51');
INSERT INTO `topics` VALUES (6, '今天天气阴7', '确实不错7', 1, '2018-08-20 11:54:28', '2018-08-20 11:54:28');
INSERT INTO `topics` VALUES (7, '今天天气阴6', '确实不错6', 1, '2018-08-20 11:54:33', '2018-08-20 11:54:33');
INSERT INTO `topics` VALUES (8, '今天天气阴7', '确实不错7', 1, '2018-08-20 11:54:37', '2018-08-20 11:54:37');
INSERT INTO `topics` VALUES (9, '我是还是9号', '对不起，我是9号', 1, '2018-08-20 11:54:42', '2018-08-22 12:15:20');
INSERT INTO `topics` VALUES (12, '我又更新了一次', '更新成功', 11, '2018-08-20 01:15:46', '2018-08-20 01:29:38');
INSERT INTO `topics` VALUES (13, '哈哈哈', '123', 1, '2018-08-21 05:45:59', '2018-08-21 05:45:59');
INSERT INTO `topics` VALUES (15, '乌拉', '啊呜啊呜，我系小恐龙', 1, '2018-08-21 09:52:00', '2018-08-22 11:20:54');
INSERT INTO `topics` VALUES (20, '我是站长，我怕谁？？？？', '哈哈哈哈~~隔~', 1, '2018-08-22 12:24:30', '2018-08-22 12:24:55');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` bit(1) NULL DEFAULT NULL,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '936610950@qq.com', '14e1b600b1fd579f47433b88e8d85291', '936610950@qq.com', 'default-avatar.png', b'0', '2018-08-19 05:58:51', '2018-08-19 17:59:10', '张松');
INSERT INTO `users` VALUES (7, '936610950@qq.com', '14e1b600b1fd579f47433b88e8d85291', '936610950@qq.com', 'default-avatar.png', b'0', '2018-08-19 06:00:41', '2018-08-19 06:00:41', '张松');
INSERT INTO `users` VALUES (8, '936610950@qq.com', '14e1b600b1fd579f47433b88e8d85291', '936610950@qq.com', 'default-avatar.png', b'0', '2018-08-19 06:02:24', '2018-08-19 06:02:24', '张松');
INSERT INTO `users` VALUES (9, '936610950@qq.com', '14e1b600b1fd579f47433b88e8d85291', '936610950@qq.com', 'default-avatar.png', b'0', '2018-08-19 06:04:25', '2018-08-19 06:04:25', '张松');
INSERT INTO `users` VALUES (10, '936610950@qq.com', '14e1b600b1fd579f47433b88e8d85291', '936610950@qq.com', 'default-avatar.png', b'0', '2018-08-19 06:05:43', '2018-08-19 06:05:43', '张松4');
INSERT INTO `users` VALUES (11, '1103977378@qq.com', '14e1b600b1fd579f47433b88e8d85291', '1103977378@qq.com', 'default-avatar.png', b'0', '2018-08-20 08:46:56', '2018-08-20 08:46:56', 'undefined');
INSERT INTO `users` VALUES (12, '1103977378@qq.com', '14e1b600b1fd579f47433b88e8d85291', '1103977378@qq.com', 'default-avatar.png', b'0', '2018-08-20 09:40:06', '2018-08-20 09:40:06', 'undefined');
INSERT INTO `users` VALUES (13, '111@qq.com', '14e1b600b1fd579f47433b88e8d85291', '111@qq.com', 'default-avatar.png', b'0', '2018-08-20 09:40:28', '2018-08-20 09:40:28', 'undefined');
INSERT INTO `users` VALUES (14, '222@qq.com', '14e1b600b1fd579f47433b88e8d85291', '222@qq.com', 'default-avatar.png', b'0', '2018-08-20 09:40:31', '2018-08-20 09:40:31', 'undefined');
INSERT INTO `users` VALUES (15, '123@qq.com', 'd9b1d7db4cd6e70935368a1efb10e377', '123@qq.com', 'default-avatar.png', b'0', '2018-08-21 12:39:49', '2018-08-21 12:39:49', '王大枪');
INSERT INTO `users` VALUES (16, '12312312@qq.com', '28c8edde3d61a0411511d3b1866f0636', '12312312@qq.com', 'default-avatar.png', b'0', '2018-08-21 12:41:37', '2018-08-21 12:41:37', '王大枪');
INSERT INTO `users` VALUES (17, '1233@qq.com', '28c8edde3d61a0411511d3b1866f0636', '1233@qq.com', 'default-avatar.png', b'0', '2018-08-21 12:42:06', '2018-08-21 12:42:06', '王大枪');
INSERT INTO `users` VALUES (18, 'test1@qq.com', 'd9b1d7db4cd6e70935368a1efb10e377', 'test1@qq.com', 'default-avatar.png', b'0', '2018-08-21 12:44:29', '2018-08-21 12:44:29', '123');
INSERT INTO `users` VALUES (19, '18356146113@qq.com', '14e1b600b1fd579f47433b88e8d85291', '18356146113@qq.com', 'default-avatar.png', b'0', '2018-08-21 03:53:48', '2018-08-21 03:53:48', '鲁迅');
INSERT INTO `users` VALUES (20, 'itcast@qq.com', '14e1b600b1fd579f47433b88e8d85291', 'itcast@qq.com', 'default-avatar.png', b'0', '2018-08-21 04:24:54', '2018-08-21 04:24:54', 'itcast');
INSERT INTO `users` VALUES (21, 'liuzhendong@qq.com', 'bb11562db2415ab610da7393e6dd1e4a', 'liuzhendong@qq.com', 'default-avatar.png', b'0', '2018-08-22 12:24:11', '2018-08-22 12:24:11', '刘振东');

SET FOREIGN_KEY_CHECKS = 1;
