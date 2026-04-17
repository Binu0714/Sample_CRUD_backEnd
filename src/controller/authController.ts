import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js'

export const signUp = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ 
            message: 'User registered successfully', 
            user: data.user 
        });
    
    }catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}