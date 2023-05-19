const Comment = require("../../model/comment/commentModel")
const { Op, where } = require("sequelize");

class commentService {
    /**
     * 新增评论
     * @param {Number} user_id 评论者id
     * @param {String} content 评论内容
     * @param {Number} article_id 文章id
     */
    async addComment(user_id, content, article_id) {
        const res = await Comment.create({ user_id, article_id, content })
        return res.dataValues
    }

    /**
     * 删除评论
     * @param {Number} id 
     */
    async backdelete(id) {
        const res = await Comment.destroy({ where: { id } })
        console.log(res)
        return res
    }

    /**
     * 后台分页获取评论
     * @param {Number} current - 当前页码
     * @param {Number} size - 每页数据条数
     */
    async backGetCommentList(current, size) {
        const offset = (current - 1) * size
        const limit = size * 1
        const { count, rows } = await Comment.findAndCountAll({
            offset, limit
        })
        return {
            current,
            size,
            list: rows,
            total: count
        }
    }
}

module.exports = new commentService()