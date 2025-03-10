const stateModel = require('../Model/StateModel');
exports.createState = async (req, res, next) => {
    const StateNamesToAdd =
        [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
                
        ]
    try {
        const StateName = await stateModel.insertMany(StateNamesToAdd.map(name => ({ State: name })));
        res.status(201).json(StateName);
    } catch (error) {
        next(error);
    }
};


//
// exports.createState=async(req,res,next)=>{
//     try {
    
//     const{State}=req.body
//     const findState=await stateModel.findOne({State})
//     if(findState){
//         return res.status(400).json({message:"State already exists"})
//     }
//     const State =new stateModel({
//         State
//     })
//     const newState=await State.save()
//     res.status(201).json(newState)
//     }catch(error){
//         next(error)
    
//     }
//     }


// Get State Names

exports.getStateNames = async (req, res, next) => {
    try {
        const StateNames = await stateModel.find();
        if(StateNames.length===0){
            return res.status(200).json({})
        }
        res.status(200).json(StateNames);
    } catch (error) {
        next(error);
    }
}


// Get State Name by ID

exports.getStateNameById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const StateName = await stateModel.findById(id);
        if(!StateName){
            return res.status(404).json({message:"State not found"})
        }
        res.status(200).json(StateName);
    }
    catch (error) {
        next(error);
    }
}


// Update State Name

exports.updateStateName = async (req, res, next) => {
    try{
       
        const { id } = req.params;
        const { State } = req.body;
        const StateName = await stateModel.findById(id);
        if(!StateName){
            return res.status(404).json({message:"State not found"})
        }
        const updatedStateName = await stateModel.findByIdAndUpdate(id, { State }, { new: true });
        res.status(200).json(updatedStateName);

    }catch(error){

        next(error);

    }
}


// Delete State Name

exports.deleteStateName = async (req, res, next) => {
    try {
        const { id } = req.params;
        const StateName = await stateModel.findById(id);
        if(!StateName){
            return res.status(404).json({message:"State not found"})
        }
        await stateModel.findByIdAndDelete(id);
        res.status(200).json({message:"State deleted successfully"});
    }
    catch (error) {
        next(error);
    }
}