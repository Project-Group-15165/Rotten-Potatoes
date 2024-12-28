import React, { useEffect, useState } from "react";
import { Input, InputGroup, FormGroup, Form, Button, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {authorizedApi} from '../../services/api'; 

function CommentForm(props) {
  const navigate = useNavigate();
  const { oldcomment, bookid} = props;
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
      const method = oldcomment ? "put" : "post"; 
      const endpoint = oldcomment
        ? `comment/${bookid}/update`
        : `comment/${bookid}/add`;

      const response = await authorizedApi[method](endpoint, comment);
      console.log("Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        navigate(0); 
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const handleDelete = async () => {
    if (!oldcomment) return;

    try {
      const response = await authorizedApi.delete(`comment/${bookid}/delete`);
      console.log("Delete Response:", response.data);

      if (response.status === 200 || response.status === 204) {
        navigate(0);
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <Form className="m-0" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Comment:</Label>
        <InputGroup className="input-group-alternative mb-3">
          <Input
            className="form-control"
            name="content" 
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
      {oldcomment && (
          <Button
            className="my-0 btn btn-danger ms-2" 
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
    </Form>
  );
}

export default CommentForm;


