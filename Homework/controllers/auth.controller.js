const userServices = require('../services/user.services.js');

const registerUser = async(req, res)=>{
    try {
        const user = await authService.registerService(req.body);
        if (user.error)
            {
                return res.status(400).json(user.error);
            }
            res.status(201).json({message: "Registered successfully", user: user});
        
    } catch (error) {
        res.status(500).send('An error occurred');
        
    }
}
const loginUser = async(req, res) => 
{
   try {
    const user = await authService.loginUser(req.body);
    if (user.error)
        {
            return res.status(400).json(user.error);
        }
        res.status(201).json({message: "Login successfully", user});
    
    
   } catch (error) {
    
   }


}