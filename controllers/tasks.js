
const Task = require('../models/task')


const getAllTasks = async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })    
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req,res) => {
    try {
    //const task = await Task.create({name:'first task'})
    const task = await Task.create(req.body) 
    res.status(201).json({task})

    } catch (error) {
        res.status(500).json({ msg: error })
    }  
}

const getTask = async (req,res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    
}

const updateTask = async (req,res) => {
    
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
  
    res.status(200).json({ task })
}

const deleteTask = async (req,res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});

        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        // res.status(200).json({task})
        res.status(200).send()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}