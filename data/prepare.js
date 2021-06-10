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

let students = fs.readFileSync("./data/students.tsv").toString()
let fee = fs.readFileSync("./data/fee.tsv").toString()
let form = fs.readFileSync("./data/form.tsv").toString()

students = students.split("\r\n").map((e) => e.split("\t"))
fee = fee.split("\r\n").map((e) => e.split("\t"))
form = form.split("\r\n").map((e) => e.split("\t"))
// (
//     Batch, x
//     SCHOOL, x
//     Programme, x
//     Semester, x
//     Specialization, x
//     Roll_Number, x
//     Student_Name, x
//     Gender, x
//     `Date of Birth`, x
//     Father_s_Name, x
//     Email,
//     `Mobile no`,
//     `Fee Status` x
// )
let data = []

function isDue(roll) {
    fee.forEach((f) => {
        if (new String(f[2]).toUpperCase() == roll) {
            return true
        }
    })
    return false
}

function getStudent(roll) {
    for (let i = 1; i < students.length; i++) {
        let student = students[i]
        if (new String(student[3]).toUpperCase() == roll) {
            return {
                roll,
                Batch: student[1],
                Programme: student[2],
                Student_Name: student[5],
                Father_s_Name: student[6],
                Semester: student[7],
                Specialization: student[8],
                SCHOOL: student[9],
                "Fee Status": isDue(roll) ? "Not Submitted" : "Submitted",
            }
        }
    }
    return false
}

async function insert() {
    for (let i = 1; i < form.length; i++) {
        let rollNo = form[i][14].toUpperCase()
        // console.log(rollNo)
        let data = getStudent(rollNo)
        if (data) {
            data = {
                ...data,
                ...{
                    dob: new Date(form[i][6])
                        .toLocaleDateString("en-IN")
                        .split("/")
                        .map((e) => {
                            if (e.length == 1) return "0" + e
                            else return e
                        })
                        .join("/"),
                    Gender: form[i][7],
                    Email: form[i][16],
                    "Mobile no": form[i][17],
                },
            }
            // console.log(data)
            let insert = await query(
                "insert into students (Batch, SCHOOL, Programme, Semester, Specialization, Roll_Number, Student_Name, Gender, `Date of Birth`, Father_s_Name, Email, `Mobile no`,`Fee Status` ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    data.Batch,
                    data.SCHOOL,
                    data.Programme,
                    data.Semester,
                    data.Specialization,
                    data.roll,
                    data.Student_Name,
                    data.Gender,
                    data.dob,
                    data.Father_s_Name,
                    data.Email,
                    data["Mobile no"],
                    data["Fee Status"],
                ]
            )
            console.log(i)
        }
    }
    // console.log(form[form.length - 1])
    // end()
    // console.log("insert done")
}
// insert()

function update() {
    fee.forEach(async (f) => {
        let roll_no = new String(f[2]).toUpperCase()
        let update = await query(
            'update students set `Fee Status` = "Not Submitted" where Roll_Number=?',
            [roll_no]
        )
    })
    end()
}
// update()
