const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/uploads");

const {
    getCustomers,
    getCustomer,
    register,
    login,
    uploadImage,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customer");

// Routes
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);

// Restrict these routes to logged-in users
router.get("/", protect, authorize("admin"), getCustomers);
router.get("/getAllCustomers", protect, authorize("admin"), getCustomers);
router.get("/getCustomer/:id", protect, authorize("admin", "customer"), getCustomer);
router.put("/updateCustomer/:id", protect, authorize("admin", "customer"), upload.single("profilePicture"), updateCustomer);
router.post("/uploadImage", protect, authorize("admin", "customer"), upload.single("profilePicture"), uploadImage);
router.post('/deleteCustomer/:id', protect, authorize('admin'), deleteCustomer);
// Add RESTful DELETE route for user deletion
router.delete('/:id', protect, authorize('admin'), deleteCustomer);

module.exports = router;