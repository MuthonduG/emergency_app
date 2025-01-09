
const API_BASE_URL = 'https://astroaid.onrender.com/api'; // Replace with your actual backend URL

/**
 * Authenticate user (login)
 */
export const loginUser  = async (credentials: { email: string; userid: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login: Invalid credentials or server error');
    }

    // Parse the success response
    const data = await response.json();

    // Ensure the response contains the expected fields
    if (!data.role) {
      throw new Error('Invalid response from server: Role not found');
    }

    // Redirect based on role
    if (data.role === 'light') {
      window.location.href = '../User';
    } else if (data.role === 'shadow') {
      window.location.href = '../Dashboard/page';
    } else {
      throw new Error('Invalid role');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};
/**
 * Authenticate device (login)
 */
export const loginDevice  = async (credentials: { devicesernum: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/devicelogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Failed to login: Invalid credentials or server error');
    }
    const data = await response.json();
    const role = data.role;
    
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Register a new user
 */
export const registerUser  = async (userData: { email: string; userid: string; phone: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register: User already exists or server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Register a new technician
 */
export const registerTechnician = async (userData: { email: string; userid: string; phone: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/technician`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register technician: Technician already exists or server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering technician:', error);
    throw error;
  }
};


/**
 * Add a new device
 */
export const addDevice = async (deviceData: {
  devicebuilding: string;
  deviceroom: string;
  devicesernum: string;
  devicestatus: string;
}) => {
  if (!deviceData.devicebuilding || !deviceData.deviceroom || !deviceData.devicesernum || !deviceData.devicestatus) {
    throw new Error('Devicebuilding, deviceroom, devicesernum, and devicestatus are required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/deviceform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData),
    });
    if (!response.ok) {
      throw new Error('Failed to add device: Device already exists or server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

/**
 * Add a new location (room)
 */
export const addLocation = async (locationData: {
  buildingname: string;
  roomname: string;
  longitude: string;
  latitude: string;
}) => {
  if (!locationData.buildingname || !locationData.roomname || !locationData.longitude || !locationData.latitude) {
    throw new Error('Buildingname, roomname, longitude, and latitude are required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/locationform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });
    if (!response.ok) {
      throw new Error('Failed to add location: Location already exists or server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding location:', error);
    throw error;
  }
};

/**
 * Add a new department
 */
export const addDepartment = async (departmentData: {
  departmentname: string;
  departmentbuilding: string;
  departmentphone: string;
}) => {
  if (!departmentData.departmentname || !departmentData.departmentbuilding || !departmentData.departmentphone) {
    throw new Error('Departmentname, departmentbuilding, and departmentphone are required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/departmentform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) {
      throw new Error('Failed to add department: Department already exists or server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding department:', error);
    throw error;
  }
};


/**
 * Fetch all devices
 */
export const fetchDevices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/device`);
    if (!response.ok) {
      throw new Error('Failed to fetch devices: Server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

/**
 * Fetch all departments
 */
export const fetchDepartments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/department`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments: Server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

/**
 * Fetch all locations
 */
export const fetchLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/location`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations: Server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

/**
 * Fetch all technician
 */
export const fetchTechnician = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/technician`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments: Server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};


/**
 * Fetch all reports
 */
export const fetchReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/report`);
    if (!response.ok) {
      throw new Error('Failed to fetch reports: Server error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
const handleUpdate = async (departmentId: string, editedData: any) => {
  if (Object.keys(editedData).length === 0) {
    console.error('No updated data provided for department');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/department/${departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    if (response.status === 404) {
      console.error('Department not found');
    } else if (response.status === 422) {
      console.error('Validation error');
    } else if (!response.ok) {
      console.error('Error updating department');
    }

    const updatedDepartments = await fetchDepartments();
    setData(updatedDepartments);
  } catch (error) {
    console.error('Error updating department:', error);
  }
};

const handleDelete = async (departmentId: string) => {
  if (!departmentId) {
    console.error('No department ID provided for deletion');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/department/${departmentId}`, {
      method: 'DELETE',
    });

    if (response.status === 404) {
      console.error('Department not found');
    } else if (!response.ok) {
      console.error('Error deleting department');
    }

    const updatedDepartments = await fetchDepartments();
    setData(updatedDepartments);
  } catch (error) {
    console.error('Error deleting department:', error);
  }
};

/**
 * Generic function to update an item
 */
export const updateItem = async (section: string, itemId: string, updatedData: any) => {
  if (!section) {
    throw new Error('No section provided for update');
  }

  if (Object.keys(updatedData).length === 0) {
    throw new Error('No updated data provided');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/update/${section}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 404) {
      throw new Error('Item not found');
    } else if (response.status === 422) {
      throw new Error('Validation error');
    } else if (!response.ok) {
      throw new Error('Error updating item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

/**
 * Generic function to delete an item
 */
export const deleteItem = async (section: string, itemId: string) => {
  if (!section) {
    throw new Error('No section provided for deletion');
  }

  if (!itemId) {
    throw new Error('No item ID provided for deletion');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/delete/${section}/${itemId}`, {
      method: 'DELETE',
    });

    if (response.status === 404) {
      throw new Error(`Item with ID ${itemId} not found in section ${section}`);
    } else if (!response.ok) {
      throw new Error('Error deleting item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

function setData(updatedDepartments: any) {
  throw new Error("Function not implemented.");
}
