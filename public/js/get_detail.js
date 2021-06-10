const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

function showDataOnCanvas(details) {
    const student_copy_positions = {
        name_of_school: [218, 238],
        name_of_programme: [255, 270],
        programme_code: [204, 306],
        student_name: [224, 339],
        examination_duration: [228, 388],
        aadhar_id: [177, 545],
        roll_no: [578, 343],
        photo: [739, 148, 961, 339],
        signature: [738, 360, 965, 424],
    }

    const office_copy_positions = {
        name_of_school: [218, 1026],
        name_of_programme: [255, 1063],
        student_name: [224, 1105],
        aadhar_id: [177, 1146],
        roll_no: [588, 1105],
        photo: [739, 927, 961, 1118],
        signature: [738, 1139, 965, 1202],
    }
    // timing_morning_shift: [221, 424],
    // timing_evening_shift: [219, 477],

    function canvasText(text, x, y) {
        ctx.font = "bold 18px Arial"
        ctx.fillText(text, x, y)
    }
    function canvasImage(image, [x1, y1, x2, y2]) {
        let width = x2 - x1
        let height = y2 - y1
        ctx.fillStyle = "red"
        ctx.fillRect(x1, y1, width, height)
        ctx.fillStyle = "black"
    }

    function draw() {
        let image = new Image()
        image.src = "../images/a4.png"
        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            canvasText(
                details.Student_name,
                student_copy_positions.student_name[0],
                student_copy_positions.student_name[1]
            )
            canvasText(
                details.SCHOOL,
                student_copy_positions.name_of_school[0],
                student_copy_positions.name_of_school[1]
            )
            canvasText(
                details.Programme,
                student_copy_positions.name_of_programme[0],
                student_copy_positions.name_of_programme[1]
            )
            canvasText(
                details["Aadhar no"] ? details["Aadhar no"] : "",
                student_copy_positions.aadhar_id[0],
                student_copy_positions.aadhar_id[1]
            )
            canvasText(
                details.Roll_number,
                student_copy_positions.roll_no[0],
                student_copy_positions.roll_no[1]
            )
            canvasImage("_", student_copy_positions.photo)
            canvasImage("_", student_copy_positions.signature)
            //office
            canvasText(
                details.Student_Name,
                office_copy_positions.student_name[0],
                office_copy_positions.student_name[1]
            )
            canvasText(
                details.SCHOOL,
                office_copy_positions.name_of_school[0],
                office_copy_positions.name_of_school[1]
            )
            canvasText(
                details.Programme,
                office_copy_positions.name_of_programme[0],
                office_copy_positions.name_of_programme[1]
            )
            canvasText(
                details["Aadhar no"] ? details["Aadhar no"] : "",
                office_copy_positions.aadhar_id[0],
                office_copy_positions.aadhar_id[1]
            )
            canvasText(
                details.Roll_number,
                office_copy_positions.roll_no[0],
                office_copy_positions.roll_no[1]
            )
            canvasImage("_", office_copy_positions.photo)
            canvasImage("_", office_copy_positions.signature)
        }
    }
    draw()
}
