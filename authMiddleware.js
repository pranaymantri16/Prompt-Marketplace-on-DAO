import supabase from "./db";

const verifyToken=async(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.status(401).json({ message: 'No token provided' })
    }

    try {
        const {user,error}=await supabase.auth.getUser(token);
        if (error || !data) {
            return res.status(401).json({ message: 'Invalid or expired token' });
          }
        req.user=data;
        next();
      
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

export default verifyToken;
