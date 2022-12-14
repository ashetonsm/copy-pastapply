import { useContext, useEffect, useState } from "react";
import { Accordion, Row, Button } from "react-bootstrap";
import TextInputContext from "../context/TextInputContext";

export const TextInput = ({ updateFromPaste }) => {

    const { loadedInput } = useContext(TextInputContext)

    const whitespace = new RegExp('\\S+', 'g')
    const bullets = new RegExp('(?:^(o|\u2022|\u2023|\u25E6|\u2043|\u2219|\u25CB|\u25CF|\u002D|\u2013)\\s)', 'gu')

    const [input, setInput] = useState({
        textInput: "",
    });

    useEffect(() => {
        setInput((input) => ({
            ...input,
            textInput: loadedInput,
        }))

    }, [loadedInput])


    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((input) => ({
            ...input,
            [id]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var splitInput = []

        // Check if there are multiple lines of text
        if (input.textInput.includes("\n")) {
            // If so, split them and assign to splitInput
            splitInput = input.textInput.split("\n")
        } else {
            // Single line, blank input
            if (!input.textInput.match(whitespace)) {
                return alert("Blank input!")
            } else {
                splitInput[0] = input.textInput
            }
        }

        // Remove all blank lines
        splitInput = splitInput.filter(line => line.match(whitespace))

        const objInput = []
        var id = 0

        splitInput.forEach(text => {

            var containsBullet = false

            if (text.match(bullets)) {
                containsBullet = true
            }

            objInput.push({ text: text, id: id++, bullet: containsBullet })
        });

        updateFromPaste(objInput)
    }

    return (
        <Accordion
            defaultActiveKey={['1']}
            alwaysOpen>
            <Accordion.Item eventKey="1" >
                <Accordion.Header>Resume Text</Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <textarea
                            onChange={handleChange}
                            id="textInput"
                            name="textInput"
                            placeholder="Paste your resume here."
                            style={{ height: '50vh' }}
                            value={input.textInput}
                        >
                        </textarea>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Row className="justify-content-center mb-2 mt-2">
                <Button
                    type="submit"
                    value="Copyify!"
                    className="col-md-4 w-50"
                    onClick={(e) => handleSubmit(e)}
                >
                    Copyify!
                </Button>
            </Row>
        </Accordion>
    )
}