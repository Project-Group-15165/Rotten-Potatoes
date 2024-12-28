import React, { useEffect, useState } from "react";
import { Input, InputGroup, FormGroup, Form, Button, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { authorizedApi } from '../../services/api'; 
import ReactStars from "react-rating-stars-component"; 

function ReviewForm(props) {
  const navigate = useNavigate();
  const { oldreview, bookid } = props;
  const [review, setReview] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    if (oldreview) {
      setReview({
        rating: oldreview.rating,
        review: oldreview.review,
      });
    }
  }, [oldreview]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setReview((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRatingChange = (newRating) => {
    setReview((prevData) => ({
      ...prevData,
      rating: newRating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = oldreview ? "put" : "post"; 
      const endpoint = oldreview
        ? `review/${bookid}/update`
        : `review/${bookid}/add`;


      const response = await authorizedApi[method](endpoint, review);
        console.log("Response:", response.data);
    
        if (response.status === 200 || response.status === 201) {
            navigate(0); 
        }

    } catch (error) {
        console.error("Failed to submit Review", error);
    }
  };

   const handleDelete = async () => {
      if (!oldreview) return;
  
      try {
        const response = await authorizedApi.delete(`review/${bookid}/delete`);
        console.log("Delete Response:", response.data);
  
        if (response.status === 200 || response.status === 204) {
          navigate(0);
        }
      } catch (error) {
        console.error("Failed to delete review", error);
      }
    };

  return (
    <Form className="m-0" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="rating">Rating:</Label>
        <ReactStars
          count={5}
          value={review.rating}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
      </FormGroup>

      <FormGroup>
        <Label for="review">Review:</Label>
        <InputGroup className="input-group-alternative mb-3">
          <Input
            className="form-control"
            name="review" 
            id="review"
            placeholder="Write your review here..."
            type="textarea"
            value={review.review}
            onChange={handleChange}
            style={{ height: "200px" }}
          />
        </InputGroup>
      </FormGroup>

      <Button className="my-0 btn btn-primary" type="submit">
        Submit
      </Button>
      {oldreview && (
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

export default ReviewForm;
