const apiUrl: string = "https://wilt-api.vercel.app/api"

interface Completed {
  sub: string | number;
  date: string;
  day: string;
  tasks: Task[];
}

interface Task {
  from: string;
  to: string;
  duration: string;
  topic: string;
  description: string;
}

interface User {
  sub: string | number;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified?: boolean;
}



//get user data with tasks
export const getUserData = async (sub: string | number | undefined) => {
  try {
    const response = await fetch(`${apiUrl}/users/withtasks?sub=${sub}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    const result = await response.json();
    // console.log(result)
    return result

  } catch (err) {
    console.error(err)
  }
}

// create a new user
export const createNewUser = async (user: User) => {
  try {
    const response = await fetch(`${apiUrl}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    const result = await response.json();
    console.log(result)

  } catch (err) {
    console.error(err)
  }
}

// create a new task
export const createNewTask = async (completed: Completed) => {
  try {
    const response = await fetch(`${apiUrl}/completed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completed),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    const result = await response.json();
    console.log(result)
    return result

  } catch (err) {
    console.error(err)
  }
}

// edit a task
export const updateTask = async (task: Task, taskId: String | number) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    const result = await response.json();
    console.log(result)

  } catch (err) {
    console.error(err)
  }
}

// delete a task
export const deleteTask = async (taskId: String | number) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    const result = await response.json();
    console.log(result)

  } catch (err) {
    console.error(err)
  }
}