/**
 * @route GET /api/comments
 * @group Comments - Operations about comments
 * @returns {Array.<Comment>} 200 - An array of comment objects
 * @returns {Error} 500 - Internal server error
 * @description Retrieves all comments from the database.
 */

/**
 * @route DELETE /api/comments/{commentId}
 * @group Comments - Operations about comments
 * @param {string} commentId.path.required - The ID of the comment to delete
 * @returns {Object} 200 - Success message
 * @returns {Error} 404 - Comment not found
 * @returns {Error} 500 - Internal server error
 * @description Deletes a comment by its ID.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Gitbub Copilot, please complete the code below
router.get("/",  (req, res) => {
    Comment.find()
        .then((comments) => {
        res.status(200).json(comments);
        })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
        });
    });

//add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});