import React, { useEffect, useState } from "react";
import { Input, InputGroup, FormGroup, Form, Button, Label } from "reactstrap";
import {authorizedApi} from '../../services/api'; // Ensure you import or define `authorizedApi`

function CommentForm(props) {
  const { oldcomment, bookid } = props;
  const [comment, setComment] = useState({
    content: "",
    spoiler: false,
  });

  useEffect(() => {
    if (oldcomment) {
      setComment(oldcomment);
    }
  }, [oldcomment]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setComment((prevData) => ({
    ...prevData,
    [name]: value
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = oldcomment ? "put" : "post"; // Use PUT for updates
      const endpoint = oldcomment
        ? `comment/${bookid}/update`
        : `comment/${bookid}/add`;

      console.log("Submitting to API Endpoint:", endpoint);
      console.log("Payload:", comment);

      const response = await authorizedApi[method](endpoint, comment,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
      console.log("Response message:", response.data.message);
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error("Submission error details:", error.response || error.message);
      alert("Failed to submit comment. Please try again.");
    }
  };

  return (
    <Form className="m-0" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Comment:</Label>
        <InputGroup className="input-group-alternative mb-3">
          <Input
            className="form-control"
            name="content" // Matches the state property
            id="content"
            placeholder="Comment on the book..."
            type="textarea"
            value={comment.content}
            onChange={handleChange}
            style={{ height: "200px" }}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="spoiler">Spoiler:</Label>
        <InputGroup className="input-group-alternative mb-3">
          <Input
            className="form-control"
            name="spoiler"
            id="spoiler"
            type="select"
            value={comment.spoiler.toString()} // Convert boolean to string
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Input>
        </InputGroup>
      </FormGroup>
      <Button className="my-0 btn btn-primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CommentForm;


