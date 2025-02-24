import knex from '../models/knex.js'

class Base {
  constructor(props) {
    this.table = props
  }

  // 查找
  all () {
    return knex(this.table).select()
  }

  // 根据用户名查找
  findByUsername (username) {
    return knex(this.table).where('Username', '=', username).first()
  }

  // 新增
  insert (params) {
    return knex(this.table).insert(params)
  }

  // 更改
  update (id, params) {
    return knex(this.table).where('id', '=', id).update(params)
  }

  // 删除
  delete (id) {
    return knex(this.table).where('id', '=', id).del()
  }


}

export default Base
