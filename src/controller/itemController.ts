import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import type { AuthRequest } from '../middleware/authMiddleware';

export const createItem = async (req: AuthRequest, res: Response) => {
    try {
        const { description, user_type } = req.body;

        if (!description || !user_type) {
            return res.status(400).json({ error: 'Description and user type are required' });
        }

        const userId = req.user?.id;

        const { data,error } = await supabase
            .from('items')
            .insert([
                {
                    description,
                    user_type,
                    user_id: userId
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json({
            message: "Item saved successfully",
            data
        });

    }catch (error: any) {
        console.error("Create Item Error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getMyItems = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
       
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        return res.status(200).json({ data });
        
    }catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}