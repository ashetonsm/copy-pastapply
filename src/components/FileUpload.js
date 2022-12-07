import { PDFTest } from "./PDFTest"

export const FileUpload = () => {

    const handleFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (file.type.toString() !== "application/pdf") {
            console.log("Invalid filetype")
        } else {
            console.log(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                // This is the result without the data:*/*;base64 prefix
                var result = reader.result.split(",")[1]

                console.log(result)
            }

        }
    }
    return (
        <div className="FileUpload">
            <h3>Upload a PDF or DOCX</h3>
            <div>
                <input type="file" id="file" onChange={handleFile} />
            </div>
            <PDFTest/>
        </div>
    )
}