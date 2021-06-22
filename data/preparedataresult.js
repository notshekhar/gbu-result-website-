const fs = require("fs")
const { promisify } = require("util")

require("dotenv").config()

let pool = require("mysql").createConnection({
    host: "localhost",
    user: "root",
    password: "shekhar2303",
    database: "students",
})

const query = promisify(pool.query).bind(pool)
const end = promisify(pool.end).bind(pool)

function insertSummary() {
    const file = fs.readFileSync("SUMMARY.tsv", "utf-8")

    const lines = file.split("\r\n")
    lines.splice(0, 1)
    const cols = lines.map((e) => e.split("\t"))

    const [
        school,
        programme_code,
        semester,
        roll_number,
        programme,
        splcode,
        specialization,
        batch,
        result,
    ] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    let i = 0
    cols.forEach(async (col) => {
        let insert = await query(`insert into result_summary values(?, ?, ?)`, [
            col[roll_number],
            col[result],
            0
        ])
        console.log(i++)
    })
}

function insertResult() {
    const file = fs.readFileSync("result.tsv", "utf-8")
    const lines = file.split("\r\n")
    lines.splice(0, 1)
    const cols = lines.map((e) => e.split("\t"))
    const [
        roll_number_slash,
        programme,
        splcode,
        roll_number,
        courseCode,
        coursecode2,
        courseName,
        credit,
        courseType,
        semeter,
        specialization,
        batch,
        programmeName,
        school,
    ] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    let i = 0
    cols.forEach(async (col) => {
        let insert = await query(`insert into result values(?, ?, ?, ?, ?)`, [
            col[roll_number_slash],
            col[courseName],
            col[courseCode],
            col[credit],
            0,
        ])
        console.log(i++)
    })
}
insertSummary()
// insertResult()
