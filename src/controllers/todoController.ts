import { Config } from "../common/config"
import { QueryTypes } from 'sequelize';


export const viewAlltodos = async (req,res)=>{
    const decodedToken = req['user'];

    try{

        const result = await Config.MySqlDB.query("select * from testActivities where user_id=:id",
        { replacements : { 'id': decodedToken.userId },type:QueryTypes.SELECT});
        
        return res.status(200).json({ name: decodedToken.name,todos:result });

    }
    catch(err){
        console.error('Error fetching todos:', err);
        return res.status(500).json({ error: 'Internal server error' }); // Return generic error response
    }
}
export const addTodo = async (req,res)=>{
    const decodedToken = req['user'];
    const today = new Date();
    const{activity_name, description, isRecurring}=req.body;

    await Config.MySqlDB.query('INSERT INTO testActivities (user_id, activity_name, description, isRecurring, create_date) VALUES (:user_id, :activity_name, :description, :isRecurring, :create_date)',
              { replacements : { 'user_id': decodedToken.userId,'activity_name':activity_name,'description':description,'isRecurring':isRecurring, 'create_date':today.toISOString()}});
      
          return res.status(201).json({ message: 'Todo added successfully' });
}