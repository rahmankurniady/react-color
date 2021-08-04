const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'db_colorpicker',
    password: '12internex34',
    port: 5432,
})

const test = (request, response) => {

    pool.query('SELECT NOW()', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const dologin = (request, response) => {
    const { email, password } = request.body

    pool.query('SELECT * from tb_user where email=$1', [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            //Email doesnt Exist
            response.status(201).json(
                {
                    success: 'false',
                    msg: 'User doesnt Exist'
                }
            )
        }
        else {
            //Email Exist
            pool.query('SELECT * from tb_user where email=$1 AND password=$2', [email, password], (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.rowCount == 0) {
                    //Password Wrong
                    response.status(202).json(
                        {
                            success: 'false',
                            msg: 'Password wrong'
                        }
                    )
                }
                else {
                    //Email & password TRUE
                    response.status(200).json(results.rows)
                }
            })
        }
    })
}

const doSignup = (request, response) => {
    const { email, username, password } = request.body

    //Check Email Exist
    pool.query('SELECT * from tb_user where email=$1', [email], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rowCount > 0) {
            //Data Exist
            response.status(201).json(
                {
                    success: 'false',
                    msg: 'Email already Exist'
                }
            )
        }
        else {
            //Insert Data
            pool.query('INSERT INTO tb_user (email, username, password) VALUES ($1,$2,$3)', [email, username, password], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(
                    {
                        success: 'Insert',
                    }
                )
            })

        }

    })
}

const getColor = (request, response) => {
    const { id } = request.body

    //Check Email Exist
    pool.query('SELECT * from data_color where id_user=$1', [id], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rowCount > 0) {
            //Data Exist
            response.status(200).json(results.rows)
        }
        else {
            response.status(205).json(
                {
                    success: 'false',
                    msg: 'No Data'
                }
            )
        }
    })
}

const putColor = (request, response) => {
    const { id, color_blue, color_red, color_green, color_yellow, color_purple } = request.body

    pool.query('SELECT * from data_color where id_user=$1', [id], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rowCount > 0) {
            //Data Update
            pool.query('UPDATE data_color SET color_blue=$2, color_red=$3, color_green=$4, color_yellow=$5, color_purple=$6 WHERE id_user=$1', [id, color_blue, color_red, color_green, color_yellow, color_purple], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).json(
                    {
                        msg: 'update'
                    }
                )
            })
        }
        else {
            //Data Insert
            pool.query('INSERT INTO data_color (id_user, color_blue, color_red, color_green, color_yellow, color_purple) VALUES ($1,$2,$3,$4,$5,$6)', [id, color_blue, color_red, color_green, color_yellow, color_purple], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(202).json(
                    {
                        msg: 'Insert'
                    }
                )
            })

        }
    })
}


module.exports = {
    dologin,
    doSignup,
    getColor,
    putColor,
    test,
}