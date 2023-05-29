const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusById,
  removeById,
} = require("../../controllers");

const {
  validateBody,
  isValidId,
  isBody,
  isBodyFavorite,
} = require("../../middlewares");

const { addSchema, updateStatusSchema } = require("../../schemas/contacts");

router.get("/", getAll);
router.get("/:id", isValidId, getById);
router.post("/", isBody, validateBody(addSchema), add);
router.put("/:id", isValidId, isBody, validateBody(addSchema), updateById);
router.patch(
  "/:id/favorite",
  isValidId,
  isBodyFavorite,
  validateBody(updateStatusSchema),
  updateStatusById
);
router.delete("/:id", isValidId, removeById);

module.exports = router;
