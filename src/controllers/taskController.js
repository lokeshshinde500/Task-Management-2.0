import taskModel from "../models/taskModel.js";

// create a new task
export const createTask = async (req, res) => {
  try {
    const totalTask = await taskModel
      .find({ created_by: req.user.id })
      .countDocuments();

    if (totalTask >= 10) {
      return res.status(400).json({
        message: "maximum task limit exceeded!",
        success: false,
      });
    }

    const { task, status, category } = req.body;

    // All fields are required
    if (!task || !category) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const newTask = {
      task,
      status,
      category,
      created_by: req.user.id,
    };

    const createdTask = await taskModel.create(newTask);

    return res.status(201).json({
      message: "task created successfully.",
      task: createdTask,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! createTask!",
      success: false,
    });
  }
};

// get all tasks for user
export const getTasksForUser = async (req, res) => {
  try {
    let filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await taskModel.find({
      created_by: req.user.id,
      ...filter,
    });

    if (!tasks) {
      return res.status(400).json({
        message: "Tasks not found!",
        success: false,
      });
    }

    return res.status(200).json({
      tasks: tasks,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! getTasksForUser!",
      success: false,
    });
  }
};

// get single task by id
export const getTaskForUser = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        message: "Task not found!",
        success: false,
      });
    }

    return res.status(200).json({
      task: task,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! getTaskForUser!",
      success: false,
    });
  }
};

// delete task by id
export const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(400).json({
        message: "Task not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! deleteTask!",
      success: false,
    });
  }
};

// update task by id
export const updateTask = async (req, res) => {
  try {
    const { task, category, status } = req.body;

    const updateTask = await taskModel.findById(req.params.id);

    if (!updateTask) {
      return res.status(400).json({
        message: "Task not found!",
        success: false,
      });
    }

    // update task
    updateTask.task = task || updateTask.task;
    updateTask.status = status || updateTask.status;
    updateTask.category = category || updateTask.category;

    const updatedTask = await updateTask.save({ new: true });

    return res.status(200).json({
      message: "Task updated successfully.",
      task: updatedTask,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! updateTask!",
      success: false,
    });
  }
};

// get all tasks for admin
export const getTasksForAdmin = async (req, res) => {
  try {
    const tasks = await taskModel.find();

    if (!tasks) {
      return res.status(400).json({
        message: "Tasks not found!",
        success: false,
      });
    }

    return res.status(200).json({
      tasks: tasks,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! getTasksForAdmin!",
      success: false,
    });
  }
};
