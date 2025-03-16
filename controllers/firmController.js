const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require("path"); // ✅ Import path module




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads")); // ✅ Correct usage of path
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // ✅ Correct usage of path.extname
    },
  });
  
const upload = multer({storage : storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        if(vendor.firm.length>0){
            return res.status(400).json({message:"vendor can have only one firm"});
        }


       

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();

        const firmId = savedFirm._id

        vendor.firm.push(savedFirm)

        await vendor.save()

        
        
        

       
        
        return res.status(200).json({ message: "Firm Added successfully",firmId });
    } 
    
    catch (error) {
        
        console.error("Error in addFirm:", error);
        
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ error: "No firm found" });
        }

        res.json({ message: "Firm deleted successfully" }); // Send success response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Fix: Export properly with multer middleware
module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById };

