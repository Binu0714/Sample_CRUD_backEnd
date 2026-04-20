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

export const updateItem = async (req: AuthRequest, res: Response) => {
    try{
        const { id } = req.params;
        const { description, user_type } = req.body;
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('items')
            .update({ description, user_type })
            .eq('id', id)
            .eq('user_id', userId)
            .select()
            .single();

        if(error || !data) {
            return res.status(404).json({ error: "Item not found or you don't have permission to update it" });
        }

        return res.status(200).json({ message: "Item updated successfully", data });

    } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteItem = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)
            .eq('user_id', userId)
            .select();

        if (error || !data || data.length === 0) {
            return res.status(404).json({ error: "Item not found or unauthorized" });
        }

        return res.status(200).json({ message: "Item deleted successfully" });
        
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}