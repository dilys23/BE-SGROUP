const conn = require("../database/connection");

const getAllUsers = async () => {
    const result = await conn.query("select * from customers");
    console.log(result);
    return result[0]
}

const getUserById = async (id) => {
    try {
        const result = await conn.query(`select * from customers where CustomerID =?`, [id]);
        console.log(result);
        return result[0]
    } catch (err) {
        console.error('Error querying database', err);
        throw (err);
    }


}
const createUser = async (user) => {
    try {
        const result = await conn.query(`insert into customers (FirstName, LastName, Email) values(?,?,?)`, [user.FirstName, user.LastName, user.Email]);
        console.log(result);
        return result[0];
    } catch (err) {
        console.error('Error querying database', err);
        throw (err);
    }

}

const updateUser = async (id) => {
    try {
        const result = await conn.query(`update customers set FirstName = "Dilysnguyen" where CustomerID = ?`, [id]);
        console.log(result);
        return result[0];
    } catch (err) {
        console.error('Error querying database', err);
        throw (err);

    }
}

const deleteUser = async (id) => {
    try {
        // const result = await conn.query(`delete from customers  where CustomerID = ${id}`); // SQL injection : cách này dễ khiến hacker chèn thêm câu lệnh xóa dữ liệu DELETE FROM customers WHERE CustomerID = 1; DROP TABLE customers;
        const result = await conn.query(`delete from customers  where CustomerID = ?`, [id]);
        console.log(result);
        return result[0];

    } catch (err) {
        console.error('Error querying database', err);
        throw (err);

    }
}
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}