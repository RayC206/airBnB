import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editASpot, findASpot, spotDelete } from "../../store/spots";
import { getReviews, createReview } from "../../store/reviews";
import "./SpotsDetail.css";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews.reviews);
  console.log(reviews);

  const [findASpotStatus, setFindASpotStatus] = useState(200);

  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
    dispatch(getReviews(spotId));
  }, [dispatch]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/spots");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editASpot(spotId));
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    dispatch(createReview(spotId));
    let path = `/spots/${spotId}/create-review`;
    history.push(path);
  };

  if (findASpotStatus === 200) {
    return (
      <div className="detailContainer">
        <div className="containerBorder">
          <div key={spot.id}>
            <h3 className="nameDetail">{spot.name}</h3>
            <h4></h4>
            <div>
              <img
                className="imageDetail"
                src={spot.previewImage}
                alt={spot.name}
              ></img>
            </div>
            <div id="Description">
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>{spot.address}</p>
              <p>{spot.description}</p>
              <p> ${spot.price} night</p>
              <p> Average rating: {spot.avgStarRating} / 5</p>
            </div>
          </div>
          <div className="spotButtons">
            <button onClick={handleEdit}>Edit Spot</button>
            <button onClick={removeSpot}>Delete Spot</button>
          </div>
        </div>
        <div className="reviewDiv">
          {reviews &&
            reviews.map((review, index) => {
              return (
                <div class="eachReview" key={index}>
                  <label>
                    Review:
                    <div>---</div>
                    <div>
                      <div className="reviewMessage"> {review.review}</div>
                      <div>---</div>

                      <div className="reviewStars"> Rating : {review.stars} out of 5 stars</div>
                    </div>
                  </label>
                </div>
              );
            })}
        </div>
        <button onClick={handleCreateReview}>Create Review</button>
      </div>
    );
  } else if (findASpotStatus === 404) {
    return (
      <div className="fourOhFour">
        <a className="fourOh">404: Spot not found</a>
        <div>
          <img src="https://images6.fanpop.com/image/photos/36500000/spongebob-spongebob-squarepants-36544130-500-338.png"></img>
        </div>
      </div>
    );
  }
};

export default SpotsDetail;
