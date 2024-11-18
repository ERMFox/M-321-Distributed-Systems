const { sendQuery } = require('../dbConnection/connector');
// modular function for making SQL querries that are then send to the db, making these queries safe from injections, thats where the name comes from
async function sanitizer(operation, table, params = {}, mods = {}) {
  let sql = "";
  let queryParams = [];

  switch (operation.toLowerCase()) {
  case 'select':
    sql = `SELECT ${mods.columns || '*'} FROM ??`;
    queryParams.push(table);

    if (mods.join) {
      sql += ` ${mods.join.type || 'INNER'} JOIN ?? ON ?? = ??`;
      queryParams.push(
        mods.join.table,
        mods.join.on[0],
        mods.join.on[1],
      );
    }

    if (mods.where) {
      sql += ` WHERE ${mods.where}`;
      queryParams.push(...mods.whereParams);
    }
    break;

  case 'insert':
    sql = `INSERT INTO ?? SET ?`;
    queryParams.push(table, params);
    break;

  case 'update':
    sql = `UPDATE ?? SET ?`;
    queryParams.push(table, params);
    if (mods.where) {
      sql += ` WHERE ${mods.where}`;
      queryParams.push(...mods.whereParams);
    }
    break;

  case 'delete':
    sql = `DELETE FROM ??`;
    queryParams.push(table);
    if (mods.where) {
      sql += ` WHERE ${mods.where}`;
      queryParams.push(...mods.whereParams);
    }
    break;

  default:
    throw new Error('Unsupported SQL operation');
  }

  try {
    const result = await sendQuery(sql, queryParams);
    return result;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
}

module.exports = {
  sanitizer,
};
