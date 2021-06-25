const loading = document.querySelector(".loading")
const edit_access = "Edit"
const header = document.querySelector("body > header")

window.details = {}

function showLoading() {
    loading.style.display = "flex"
}
function hideLoading() {
    loading.style.display = "none"
}
showLoading()

async function getAdminDetails() {
    let res = await fetch("/api/get_schools")
    let data = await res.json()
    if (data) {
        hideLoading()
        console.log(data)
        createSchoolDropDown(data)
    }
}
function createSchoolDropDown(data) {
    let school_dropdown = createElement("div", {
        class: "custom-select schools",
        style: "width:200px",
    })
    let select = createElement("select")
    select.addEventListener("change", function () {
        details.school = this.value
        createProgrammeDropDown(this.value)
        showLoading()
    })
    select.append(
        createElement("option", {
            hidden: "hidden",
            selected: "selected",
            innerText: "Select School",
        })
    )
    data.forEach((school) => {
        let school_dropdown_menu_item = createElement("option", {
            class: "dropdown-item",
            value: school["SCHOOL"],
            innerText: school["SCHOOL"],
        })
        select.append(school_dropdown_menu_item)
    })
    // select.append(
    //     createElement("option", {
    //         innerText: "Select School",
    //     })
    // )
    school_dropdown.append(select)
    header.append(school_dropdown)
}
async function createProgrammeDropDown(school) {
    let res = await fetch(`/api/get_programmes?school=${school}`)
    let data = await res.json()
    hideLoading()
    console.log(data)
    let check_div = document.querySelector(".programmes")
    if (check_div) check_div.remove()
    let check_batch = document.querySelector(".batches")
    if (check_batch) check_batch.remove()
    let check_specialization = document.querySelector(".specializations")
    if (check_specialization) check_specialization.remove()

    let programme_dropdown = createElement("div", {
        class: "custom-select programmes",
    })
    let select = createElement("select")
    select.append(
        createElement("option", {
            hidden: "hidden",
            selected: "selected",
            innerText: "Select Programme",
        })
    )
    select.addEventListener("change", function () {
        details.programme = this.value
        createBatchDropDown(school, this.value)
        showLoading()
    })
    data.forEach((programme) => {
        let programme_dropdown_menu_item = createElement("option", {
            class: "dropdown-item",
            value: programme["Programme"],
            innerText: programme["Programme"],
        })
        select.append(programme_dropdown_menu_item)
    })
    programme_dropdown.append(select)
    header.append(programme_dropdown)
}
async function createBatchDropDown(school, programme) {
    let res = await fetch(
        `/api/get_batches?school=${school}&programme=${programme}`
    )
    let data = await res.json()
    hideLoading()
    console.log(data)
    let check_div = document.querySelector(".batches")
    if (check_div) check_div.remove()
    let check_specialization = document.querySelector(".specializations")
    if (check_specialization) check_specialization.remove()

    let batch_dropdown = createElement("div", {
        class: "custom-select batches",
    })
    let select = createElement("select")
    select.append(
        createElement("option", {
            hidden: "hidden",
            selected: "selected",
            innerText: "Select Batch",
        })
    )
    select.addEventListener("change", function () {
        details.batch = this.value
        // createSpecializationDropDown(school, programme, this.value)
        DisplyStudentsData(school, programme, batch)
        showLoading()
    })
    data.forEach((batch) => {
        let batch_dropdown_menu_item = createElement("option", {
            class: "dropdown-item",
            value: batch["Batch"],
            innerText: batch["Batch"],
        })
        select.append(batch_dropdown_menu_item)
    })
    batch_dropdown.append(select)
    header.append(batch_dropdown)
}

// async function createSpecializationDropDown(school, programme, batch) {
//     let res = await fetch(
//         `/api/get_specialization?school=${school}&programme=${programme}&batch=${batch}`
//     )
//     let data = await res.json()
//     hideLoading()
//     console.log(data)
//     let check_div = document.querySelector(".specializations")
//     if (check_div) check_div.remove()

//     let specializations_dropdown = createElement("div", {
//         class: "custom-select specializations",
//     })
//     let select = createElement("select")
//     select.append(
//         createElement("option", {
//             hidden: "hidden",
//             selected: "selected",
//             innerText: "Select Specializations",
//         })
//     )
//     select.addEventListener("change", function () {
//         details.specialization = this.value
//         DisplyStudentsData(school, programme, batch, this.value)
//         showLoading()
//     })
//     data.forEach((specializations) => {
//         let specializations_dropdown_menu_item = createElement("option", {
//             class: "dropdown-item",
//             value: specializations["Specialization"],
//             innerText: specializations["Specialization"],
//         })
//         select.append(specializations_dropdown_menu_item)
//     })
//     specializations_dropdown.append(select)
//     header.append(specializations_dropdown)
// }
getAdminDetails()

async function DisplyStudentsData(school, programme, batch, specialization) {
    let res = await fetch(
        `/api/get_students_data?school=${school}&programme=${programme}&batch=${batch}&specialization=${specialization}`
    )
    let data = await res.json()
    hideLoading()
    console.log(data)
    let filter = document.querySelector(".wrap > .filter")
    filter.innerHTML = ""
    let download_csv = createElement("button", {
        class: "download_csv",
        innerText: "Download csv",
    })
    download_csv.addEventListener("click", () => {
        let csv = json2csv(data.data)
        downloadCSV(csv, "data.csv")
    })
    let filter_text = createElement("span", {
        innerText: "Filter : ",
    })
    let filter_select = createElement("select")
    filter_select.append(
        createElement("option", {
            hidden: "hidden",
            selected: "selected",
            innerText: "Select Fee Status",
        })
    )
    let filter_option0 = createElement("option", {
        value: "all",
        innerText: "All",
    })
    let filter_option1 = createElement("option", {
        value: "Submitted",
        innerText: "Submitted",
    })
    let filter_option2 = createElement("option", {
        value: "Not Submitted",
        innerText: "Not Submitted",
    })
    filter_select.append(filter_option0, filter_option1, filter_option2)
    filter.append(download_csv, filter_text, filter_select)
    filter_select.addEventListener("change", function () {
        let value = this.value
        if (value == "all") drawTableData(data)
        else drawTableData(data, value)
    })
    // let
    drawTableData(data)
}

let columns = [
    "S.No",
    "Batch",
    "SCHOOL",
    "Semester",
    "Roll_Number",
    "Student_Name",
    "FeeStatus",
]
function drawTableData(data, select) {
    let table_body = document.querySelector("table > tbody")
    table_body.innerHTML = ""
    let counter = 1
    data.data.forEach((student) => {
        let tr = createElement("tr")
        if (select) {
            if (student.FeeStatus != select) return
        }
        for (let i = 0; i < columns.length; i++) {
            let key = columns[i]
            let td = createElement("td")
            if (key == "S.No") {
                td.innerText = counter
                counter++
            } else if (
                key == "FeeStatus" &&
                data.permission.AccessLevel == edit_access
            ) {
                td = createElement("td")
                let _switch = createElement("label", {
                    class: "switch",
                })
                let input_check = createElement("input", {
                    class: "checkbox",
                    type: "checkbox",
                })
                input_check.checked =
                    student.FeeStatus == "Submitted" ? true : false
                let span_ = createElement("span", {
                    class: "slider round",
                })
                input_check.addEventListener("change", async function () {
                    let checked = this.checked
                    console.log(checked)
                    try {
                        showLoading()
                        let res = await fetch(
                            `/api/update?roll_no=${student.Roll_Number}&data=${
                                checked ? "Submitted" : "Not Submitted"
                            }`
                        )
                        let data = await res.json()
                        console.log(data)
                        hideLoading()
                        if (!data.updated) {
                            this.checked = !checked
                        }
                        if (data.updated) {
                            student.FeeStatus = checked
                                ? "Submitted"
                                : "Not Submitted"
                        }
                    } catch (err) {
                        alert("Something Went Wrong Can't Update")
                        this.checked = !checked
                    }
                })
                _switch.append(input_check, span_)
                td.append(_switch)
            } else {
                td.innerText = student[key]
            }
            tr.append(td)
        }
        table_body.append(tr)
    })
}
//
const logout = document.querySelector(".logout")

logout.addEventListener("click", () => {
    cookie.setItem("token", "")
    location.href = "/"
})

function json2csv(data) {
    let str = ""
    let l = ""
    for (let col of columns) {
        l += `${col},`
    }
    l = l.slice(0, l.length - 1)
    str += l + "\r\n"
    let counter = 0
    data.forEach((e) => {
        let line = ""
        counter++
        line += counter + ","
        for (let i = 1; i < columns.length; i++) {
            line += e[columns[i]] + ","
        }
        line = line.slice(0, line.length - 1)
        str += line + "\r\n"
    })
    return str
}

function downloadCSV(content, filename, contentType = "text/csv") {
    console.log(content)
    let a = document.createElement("a")
    let blob = new Blob([content], { type: contentType })
    a.href = window.URL.createObjectURL(blob)
    a.download = filename
    a.click()
}
