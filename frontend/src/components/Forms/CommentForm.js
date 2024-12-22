import React, { useState } from "react";
import { Input, FormGroup, Form, Button, Label } from 'reactstrap';

function CommentForm() {
  const [comment, setComment] = useState({
    content: "",
    spoiler: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComment((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted comment:', comment);
    // Add your submit logic here
  };

  return (
    <Form onSubmit={handleSubmit} className="m-0">
      <FormGroup>
        <Label for="content">Comment:</Label>
        <Input
          className="form-control"
          name="content"
          id="content"
          placeholder="Comment on the book..."
          type="textarea"
          value={comment.content}
          onChange={handleChange}
          style={{ height: '200px' }} // Set height using inline style
        />
      </FormGroup>
      <FormGroup>
        <Label for="spoiler">Spoiler:</Label>
        <Input
          className="form-control"
          name="spoiler"
          id="spoiler"
          type="checkbox"
          checked={comment.spoiler}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </Form>
  );
}

export default CommentForm;