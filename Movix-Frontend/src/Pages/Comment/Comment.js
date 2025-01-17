import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Comment.css";
import Profile from "../Assests/Profile.img.png";

const Comment = () => {
  const { media_id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [renderDelete, setRenderDelete] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [gettingValue, setGettingValue] = useState("");
  const [gettingId, setGettingId] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchComment = async () => {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/Comment/getComment/${media_id}`,
        {
          withCredentials: true,
        }
      );

      setComments(data.comments);
      setUserId(sessionStorage.getItem("user"));
      setRenderDelete(false);
    };
    fetchComment();
  }, [renderDelete, media_id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "")
      return toast.error("Please Share your Experience ");
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.REACT_APP_PRODUCTION_URL}/Comment/addComment/${media_id}`,
        { comment: newComment },
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Comment Added");
        setNewComment("");
        setRenderDelete(true);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDelete = async (e) => {
    let deleteCommentId = e._id;

    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `${process.env.REACT_APP_PRODUCTION_URL}/Comment/deleteComment/${deleteCommentId}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      setRenderDelete(true);
    }
  };
  const onClose = () => {
    setGettingValue("");
    setEditComment(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.patch(
        `${process.env.REACT_APP_PRODUCTION_URL}/Comment/editComment/${gettingId}`,
        {
          comment: gettingValue,
        },
        {
          withCredentials: true,
        }
      );

      setEditComment(false);
      setRenderDelete(true);
    } catch (err) {
      toast.error("Please try again later");
    }
  };
  const handleEdit = (e) => {
    setGettingValue(e.comment);
    setGettingId(e._id);
    setEditComment(true);
  };

  return (
    <>
      <div className="comment-section">
        <h2>Comments</h2>
        <div className="comment-input">
          <textarea
            value={newComment}
            // name="comment"
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
          ></textarea>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments?.map((singleComment, index) => (
              <div key={index} className="comment">
                <div className="comment-profile">
                  <img
                    src={Profile}
                    alt="logo"
                    style={{ backgroundColor: "white", borderRadius: "50%" }}
                  />
                </div>
                <div className="comment-content">
                  <p>{singleComment.comment}</p>
                  <div className="comment-header">
                    <p className="comment-name">
                      Comment By:{singleComment.commentBy} on{" "}
                      {new Date(singleComment.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {singleComment.user === userId && (
                    <div className="comment-button">
                      <button onClick={() => handleEdit(singleComment)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(singleComment)}>
                        delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {editComment && (
        <>
          <div className="blurred-background"></div>
          <div className="edit-section">
            <h2>Edit Comment</h2>
            <textarea
              value={gettingValue}
              onChange={(e) => setGettingValue(e.target.value)}
              placeholder="Edit your comment..."
            />
            <div className="edit-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
