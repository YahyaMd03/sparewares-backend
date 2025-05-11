const Manufacture = require("../../../model/admin_model/categories_Model/Manufactures")
//Post category
exports.manufacture_post = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const image = req.file.location;
        if (!name || !desc || !image) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const Manufacture_field = await Manufacture.create({ name, desc, image: image });
            return res.status(200).json({ success: true, Manufactures: Manufacture_field })
        }
    }
    catch (err) {
        console.log("error :", err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//fetch category
exports.manufacture_fetch = async (req, res) => {
    try {
        const manufacture_field = await Manufacture.find({ is_deleted: false });
        return res.status(200).json({ success: true, manufactures: manufacture_field })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//fetch category BY ID  
exports.manufacture_fetch_id = async (req, res) => {
    try {
        const manufacture_id = req.params.id;
        const fetch_manufacture_id = await Manufacture.find({ _id: manufacture_id });
        return res.status(200).json({ success: true, manufactures: fetch_manufacture_id })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//UPDATE category BY ID 
exports.update_manufacture_id = async (req, res) => {
    try {
        const file = req.file;
        const { name, desc } = req.body;
        const manufacture_id = req.params.id;
        
      if (file) {
        const imagePath = req.file.location;
        await Manufacture.findByIdAndUpdate(
          manufacture_id,
          { name, desc, image: imagePath },
          { new: true }
        );
      } else {
        await Manufacture.findByIdAndUpdate(
          manufacture_id,
          { name, desc },
          { new: true }
        );
      }
  
      return res.status(200).json({
        success: true,
        message: 'Manufacture updated successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  


//delete category BY ID 
exports.delete_manufacture = async (req, res) => {
    try {
        const manufacture_id = req.params.id;
        const updated_manufacture = await Manufacture.findByIdAndUpdate(manufacture_id, { is_deleted: true }, { new: true });
        if (!updated_manufacture) {
            return res.status(404).json({ message: 'Manufacture not found' });
        } else {
            return res.status(200).json({ success: true, manufactures: updated_manufacture })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

