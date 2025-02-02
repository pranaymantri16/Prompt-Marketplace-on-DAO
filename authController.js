import supabase from "./db";

   async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
  }

  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
  }

  export const registerUser=async(req,res)=>{
        const {email,password}=req.body
        const {data,error}=await supabase.auth.signUp({
            email:email,
            password:password,
        })
        if (error) {
            return res.status(400).json({ message: error.message });
          }
        
          if (!data.session) {
            return res.status(200).json({ message: 'Please check your inbox for email verification!' });
          }
        
          res.status(200).json({ message: 'Sign up successful', session: data.session });
  }

  export const loginUser=async(req,res)=>{
        const {email,password}=req.body
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
        
          if (error) {
            return res.status(400).json({ message: error.message });
          }
        
          res.status(200).json({ message: 'Sign in successful' });
        
        
  }