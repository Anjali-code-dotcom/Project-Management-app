import { useEffect, useState } from "react";
import API from "../services/api";

function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const res = await API.get(`/comments/${ticketId}`);
      setComments(res.data);
    };
    fetchComments();
  }, [ticketId]);

  // ✅ Add comment / reply
  const addComment = async () => {
    if (!text) return;

    const res = await API.post("/comments", {
      ticketId,
      text,
      parentId: replyTo, // 🔥 reply support
    });

    setComments([...comments, res.data]);
    setText("");
    setReplyTo(null);
  };

  // ✅ Build threaded structure
  const buildTree = (list, parentId = null) => {
    return list
      .filter((c) => String(c.parentId) === String(parentId))
      .map((c) => ({
        ...c,
        replies: buildTree(list, c._id),
      }));
  };

  const tree = buildTree(comments);

  // ✅ Recursive UI
  const renderComments = (nodes, level = 0) => {
    return nodes.map((c) => (
      <div key={c._id} style={{ marginLeft: level * 15 }}>
        <div className="bg-gray-100 p-2 rounded mt-1 text-sm">
          {c.text}
        </div>

        {/* Reply button */}
        <button
          onClick={() => setReplyTo(c._id)}
          className="text-xs text-blue-500 ml-2"
        >
          Reply
        </button>

        {/* Replies */}
        {c.replies.length > 0 && renderComments(c.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="mt-2">

      {/* Comments Tree */}
      {renderComments(tree)}

      {/* Input */}
      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={replyTo ? "Reply..." : "Add comment..."}
          className="border px-2 py-1 rounded w-full text-sm"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-2 rounded text-sm"
        >
          Post
        </button>
      </div>

    </div>
  );
}

export default Comments;