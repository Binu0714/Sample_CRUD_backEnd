import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import type { AuthRequest } from '../middleware/authMiddleware';

export const createItem = async (req: AuthRequest, res: Response) => {
    try {
        const { description, user_type } = req.body;

        if (!description || !user_type) {
            return res.status(400).json({ error: 'Description and user type are required' });
        }

        const { data,error } = await supabase
            .from('items')
            .insert([
                {
                    description,
                    user_type,
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
        console.error("Create Task Error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}