// const URL =

// "https://raw.githubusercontent.com/notshekhar/gbu_attendance/master/images/"
const loading = document.querySelector(".loading")

function showLoading() {
    loading.style.display = "flex"
}
function hideLoading() {
    loading.style.display = "none"
}

const blobToBase64 = (blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result)
        }
    })
}

const URL = "/images/"
let images = [
    "_dsf8951.webp",
    "_dsf8963.webp",
    "_dsf8982.webp",
    "_dsf8724a.webp",
]
let i = 1
let im

let imagesURL = []

let images_loaded = false

showLoading()

images.forEach(async (image, i) => {
    let res = await fetch(`/images/${image}`)
    let data = await res.blob()
    let base64 = await blobToBase64(data)
    imagesURL.push(base64)
    if (i == images.length - 1) {
        hideLoading()
        images_loaded = true
    }
})
setInterval(() => {
    if (images_loaded) {
        im = imagesURL[i]
        cssv("im", `url(${im})`)
        i++
        i %= images.length
    }
}, 3000)

//get and set css variables
function cssv(name, value) {
    if (name[0] != "-") name = "--" + name //allow passing with or without --
    if (value) document.documentElement.style.setProperty(name, value)
    return getComputedStyle(document.documentElement).getPropertyValue(name)
}

// BUDDHA UNIVERSITY CS file FINAL.docx"
//file.file.file.docx

history.pushState({ page: "main" }, "", "")

const roll_no = document.querySelector(".roll_no")
const email = document.querySelector(".email")
const mobile = document.querySelector(".mobile")

const submit = document.querySelector(".submit")

const download_div = document.querySelector(".download")
const download_button = document.querySelector(".download > .header > .downbtn")

function resetForm() {
    roll_no.value = ""
    email.value = ""
    mobile.value = ""
}
function validMobile(mobile) {
    console.log(mobile)
    return /^\d{10}$/.test(mobile)
}
function validEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

submit.onclick = async () => {
    let data = {
        roll_no: roll_no.value.trim(),
        email: email.value.trim(),
        mobile: mobile.value.trim(),
    }
    for (let d in data) {
        if (!data[d]) {
            alert("All Fields are required")
            return
        }
    }
    if (!validEmail(data.email)) {
        alert("Enter a valid email")
        return
    }
    if (!validMobile(data.mobile)) {
        alert("Enter a valid mobile number")
        return
    }
    console.log(data)
    try {
        showLoading()
        let res = await fetch("/api/getdetails", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        let resData = await res.json()
        // console.log(resData)
        if (resData.get) {
            if (!resData.data) {
                alert(
                    "Unable to download the result, Follow this link: https://tinyurl.com/GBUstudent"
                    // "No data found Retry with different roll number, email and mobile"
                )
                resetForm()
            } else {
                console.log(JSON.stringify(resData.data))
                // // put in details in canvas
                showResult(resData.data)
                // //show download div
                download_div.style.display = "block"
                // //push history
                history.pushState({ page: "result" }, "result", "result")
            }
        } else {
            alert(resData.message)
            console.log(resData.message)
            // else
        }
        if (resData.error) {
            alert(resData.message)
            console.log(resData.message)
        }
        hideLoading()
    } catch (err) {
        hideLoading()
        console.log(err)
        alert(err.message)
    }
}
window.onpopstate = (e) => {
    let page = e.state.page
    if (page == "main") {
        resetForm()
        download_div.style.display = "none"
    }
}

// let data = {
//     id: 13600,
//     Batch: "2020-2022",
//     SCHOOL: "SOBT",
//     sgpa: "8.3",
//     Programme: "M.Sc. (Biotechnology)",
//     Semester: "I",
//     Specialization: "-",
//     Roll_Number: "20/MBT/001",
//     "Photo Upload(.jpg)": null,
//     Student_Name: "Adhishree Yadav",
//     Gender: "Female",
//     "Date of Birth": "27/07/2000",
//     Father_s_name: "",
//     Email: "biotech1253@gmail.com",
//     "Mobile no": "8960771253",
//     "Aadhar no": null,
//     "Aadhar Image(.jpg)": null,
//     "Signature(.jpg)": null,
//     "Fee Status": "Submitted",
//     result: [
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Biochemistry",
//             subjectCode: "BtMSc501",
//             credit: "3",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Cell and Molecular Biology",
//             subjectCode: "BtMSc503",
//             credit: "3",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Plant and Animal Biotechnology",
//             subjectCode: "BtMSc505",
//             credit: "3",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Microbiology",
//             subjectCode: "BtMSc507",
//             credit: "2",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Genetics",
//             subjectCode: "BtMSc509",
//             credit: "2",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Biostatistics",
//             subjectCode: "MA415",
//             credit: "3",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Basics of Chemistry and Physics",
//             subjectCode: "BtMSc511",
//             credit: "2",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Biochemistry and Analytical Techniques",
//             subjectCode: "BtMSc513",
//             credit: "4",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Microbiology Lab",
//             subjectCode: "BtMSc515",
//             credit: "2",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "Plant and Animal Biotechnology Lab",
//             subjectCode: "BtMSc517",
//             credit: "2",
//             score: "0",
//         },
//         {
//             Roll_Number: "20/MBT/001",
//             subject: "General Proficiency",
//             subjectCode: "GP",
//             credit: "0",
//             score: "0",
//         },
//     ],
//     result_summary: "Promoted",
// }
// showResult(data)
function showResult(details) {
    download_button.onclick = () => print(details.Roll_Number)
    // function download(filename) {
    //     var link = document.createElement("a")
    //     link.download = `${filename}.png`
    //     link.href = canvas.toDataURL()
    //     link.click()
    // }
    const result_div = document.querySelector(".result_div > .result")
    const wrap = createElement("div", {
        class: "wrap",
    })
    const institute = createElement("div", {
        class: "institute_name",
        innerHTML: "GAUTAM BUDDHA UNIVERSITY",
    })
    const detail_div = createElement("div", {
        class: "detail_div",
    })
    const roll_number_div = createElement("div", {
        class: "details_div",
    })
    const roll_title = createElement("div", {
        class: "title",
        innerText: "Roll Number: ",
    })
    const roll_value = createElement("div", {
        class: "value",
        innerText: details.Roll_Number,
    })
    roll_number_div.append(roll_title, roll_value)

    const name_div = createElement("div", {
        class: "details_div",
    })
    const name_title = createElement("div", {
        class: "title",
        innerText: "Name: ",
    })
    const name_value = createElement("div", {
        class: "value",
        innerText: details.Student_Name,
    })
    name_div.append(name_title, name_value)
    const school_div = createElement("div", {
        class: "details_div",
    })
    const school_title = createElement("div", {
        class: "title",
        innerText: "School: ",
    })
    const school_value = createElement("div", {
        class: "value",
        innerText: details.SCHOOL,
    })
    school_div.append(school_title, school_value)
    const programe_div = createElement("div", {
        class: "details_div",
    })
    const programe_title = createElement("div", {
        class: "title",
        innerText: "Programme: ",
    })
    const programe_value = createElement("div", {
        class: "value",
        innerText: details.Programme,
    })
    programe_div.append(programe_title, programe_value)
    const result_de_div = createElement("div", {
        class: "details_div",
    })
    const result_title = createElement("div", {
        class: "title",
        innerText: "Result: ",
    })
    const result_value = createElement("div", {
        class: "value",
        innerText: details.result_summary,
    })
    result_de_div.append(result_title, result_value)

    const sgpa_de_div = createElement("div", {
        class: "details_div",
    })
    const sgpa_title = createElement("div", {
        class: "title",
        innerText: "SGPA: ",
    })
    const sgpa_value = createElement("div", {
        class: "value",
        innerText: details.sgpa,
    })
    sgpa_de_div.append(sgpa_title, sgpa_value)

    detail_div.append(
        roll_number_div,
        name_div,
        school_div,
        programe_div,
        result_de_div,
        sgpa_de_div
    )
    //table
    const table = createElement("table", {
        class: "table",
    })
    const thead = createElement("thead")
    const tr_thead = createElement("tr")
    const th_tr_thead1 = createElement("th", {
        scope: "col",
        innerText: "Subject Code",
    })
    const th_tr_thead2 = createElement("th", {
        scope: "col",
        innerText: "Subject Name",
    })
    const th_tr_thead4 = createElement("th", {
        scope: "col",
        innerText: "Grade",
    })
    tr_thead.append(th_tr_thead1, th_tr_thead2, th_tr_thead4)
    thead.append(tr_thead)

    const tbody = createElement("tbody")
    for (let i = 0; i < details.result.length; i++) {
        let row = details.result[i]
        let tr_tbody = createElement("tr")
        let td1 = createElement("td", {
            innerText: row.subjectCode,
        })
        let td2 = createElement("td", {
            innerText: row.subject,
        })
        let td4 = createElement("td", {
            innerText: row.score,
        })
        tr_tbody.append(td1, td2, td4)
        tbody.append(tr_tbody)
    }
    table.append(thead, tbody)
    //wrap
    wrap.append(institute, detail_div, table)
    result_div.append(wrap)
    hideLoading()
}
function print(f) {
    const filename = f
    let wrap = document.querySelector(".result_div")
    let { width, height } = wrap.getBoundingClientRect()
    let ratio = height / width
    let reduced_by_width = width - 210
    let calculated_reduced_height = ratio * reduced_by_width
    let calculated_height = height - calculated_reduced_height
    html2canvas(wrap).then((canvas) => {
        // console.log(canvas.toDataURL())
        let pdf = new jspdf.jsPDF()
        // pdf.setFillColor(244, 244, 244)
        // pdf.rect(0, 0, 210, 297, "F")
        pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            210,
            calculated_height
        )
        console.log(calculated_height)
        pdf.save(filename)
    })
}

//ADMIN
//ADMIN login
const admin_login_btn = document.querySelector(".header > .admin > .login")
const login_wrap = document.querySelector(".login_wrap")
const close = [
    login_wrap.querySelector(".close"),
    login_wrap.querySelector(".close_btn"),
]
const username = login_wrap.querySelector(".username")
const password = login_wrap.querySelector(".password")
const submit_login_btn = login_wrap.querySelector("button")

let admin_login_shown = false

admin_login_btn.onclick = async () => {
    let res = await fetch("/api/auth")
    let data = await res.json()
    if (data.auth) {
        location.href = "/admin"
    } else {
        if (!admin_login_shown) {
            // console.log("okay")
            login_wrap.style.display = "block"
            admin_login_shown = !admin_login_shown
        }
    }
}
close.forEach((c) => {
    c.onclick = () => {
        if (admin_login_shown) {
            login_wrap.style.display = "none"
            admin_login_shown = !admin_login_shown
        }
    }
})

// submit_login_btn.onclick = async () => {
//
// }

submit_login_btn.addEventListener("click", async function () {
    let data = {
        username: username.value,
        password: password.value,
    }
    for (let key in data) {
        if (data[key].length == 0) {
            alert("Username or Password is missing")
            return
        }
    }
    let res = await fetch("/api/admin_login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    let resData = await res.json()
    if (resData.login) {
        cookie.setItem("token", resData.token)
        location.href = "/admin"
    } else {
        alert("Wrong Password or Username")
    }
    console.log(resData)
})

// notsh3Khar
