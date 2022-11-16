import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getTour, getRelatedTours } from "../redux/features/tourSlice";
import RelatedTour from "../components/RelatedTour";
import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id, dispatch]);
  return (
    <MDBContainer>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
          src={tour.imageFile}
          alt={tour.title}
        />
        <MDBCardBody>
          <MDBBtn
            tag="a"
            color="none"
            style={{ float: "left", color: "#000" }}
            onClick={() => navigate("/")}
          >
            <MDBIcon
              fas
              size="lg"
              icon="long-arrow-alt-left"
              style={{ float: "left" }}
            />
          </MDBBtn>
          <h3>{tour.title}</h3>
          <span>
            <p className="text-start tourName">created by:{tour.name}</p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {tour && tour.tags && tour.tags.map((item) => `# ${item}`)}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2">
            <MDBIcon
              style={{ float: "left", margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(tour.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {tour.description}
          </MDBCardText>
        </MDBCardBody>
        <RelatedTour relatedTours={relatedTours} tourId={id} />
      </MDBCard>
      <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
    </MDBContainer>
  );
};

export default SingleTour;
