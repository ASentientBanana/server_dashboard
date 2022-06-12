import Form from 'react-bootstrap/Form';





interface IProps {
    fieldName: string
}

const FormField = ({ fieldName }: IProps) => {

    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control type="text" placeholder={fieldName} />
            {/* <Form.Text className="text-muted">
                {}
            </Form.Text> */}
        </Form.Group>
    )
}

export default FormField;
