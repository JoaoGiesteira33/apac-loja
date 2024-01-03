import axios from 'axios';
//import mime from 'mime';

export const API_URL_USER = 'http://localhost:11000/user';
export const API_URL_PROD = 'http://localhost:11000/product';
export const AUTH_URL     = 'http://localhost:11001';
//export const BASE_URL = 'http:/192.168.1.68:8000/api';

export const loginUser = async (email: string, password: string) => {
    console.log("Logging in user");
    console.log("credentials: ", email, "|", password)
    try {
        const response = await axios.post(`${AUTH_URL}/login`, { username: email, password });
        console.log("resposta: ", response.data)
        return response.data;
    }
    catch (err) {
        console.log("Error during login: " + err.message);
        return err.response;
    }
}

export const fetchUser = async (id: string, level: string) => {
    console.log("Fetching user " + id);

    if(level === "admin" || level === "client"){
        axios.get(`${API_URL_USER}/client/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log("Error fetching client: " + err.message);
                throw err.message;
            });
    }
    else // if(level == "artist")
        axios.get(`${API_URL_USER}/artist/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log("Error fetching artist: " + err.message);
                throw err.message;
            });
}

export const registerUser = async (body: FormData) => {
    console.log("Registering user");
    console.log("body: ", body)
    var object = {};
    body.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log("json: ", object);

    try {
        const response = await axios.post(`${AUTH_URL}/registo`, object);
        console.log("resposta: ", response.data)
        return response.data;
    }
    catch (err) {
        console.log("Error during register: " + err.message);
        return err.response;
    }
}



/*
export const sendEmail = async (toEmail, subject, message) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/send-email`, {
            email: toEmail,
            subject,
            text: message
        });
        return response.data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const generateRecoveryCode = async (email) => {
    console.log("Generating recovery code for user with email " + email);
    try {
        const response = await axios.post(`${BASE_URL}/users/generate-recovery`, { email });
        return response.data;
    } catch (error) {
        console.error("Error generating recovery code:", error);
        throw error;
    }
};

export const verifyRecoveryCode = async (email, code) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/verify-recovery`, { email, code });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error verifying recovery code:", error);
        return { success: false, message: 'Failed to verify recovery code' };
    }
};

export const verifyUser = async (email, code) => {
    try {

        console.log("Verifying user with email " + email + " and code " + code);
        const response = await axios.post(`${BASE_URL}/users/verify-account`, { email, code });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error verifying user:", error);
        return { success: false, message: 'Failed to verify user' };
    }
};

// ********** USERS **********

export const fetchUsers = async () => {
    console.log("Fetching users");

    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching users: " + err.message);
    }
}

export const fetchUser = async (id) => {
    console.log("Fetching user with id " + id);

    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching user: " + err.message);
    }
}

export const fetchUserByEmail = async (email) => {
    console.log("Fetching user with email " + email);

    try {
        const response = await axios.get(`${BASE_URL}/users?email=${email}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching user: " + err.message);
    }
}

export const addUser = async (user) => {
    console.log("Adding user");

    try {
        const response = await axios.post(`${BASE_URL}/users`, user);
        return response.data;
    }
    catch (err) {
        console.log("Error adding user: " + err.message);
    }
}

export const updateUser = async (user) => {
    console.log("Updating user with id " + user.id);

    try {
        const response = await axios.put(`${BASE_URL}/users/`, user);
        console.log("User updated: " + response);
        return response.data;
    }
    catch (err) {
        console.log("Error updating user: " + err.message);
    }
}

export const deleteUser = async (id) => {
    console.log("Deleting user with id " + id);

    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error deleting user: " + err.message);
    }
}

export const loginUser = async (credentials) => {
    console.log("Logging in user");
    console.log("credentials: ", credentials)
    try {
        const response = await axios.post(`${BASE_URL}/authentication/login`, credentials);
        console.log("resposta: ", response.data)
        return response.data;
    }
    catch (err) {
        console.log("Error during login: " + err.message);
        throw err;
    }
}


export const registerUser = async (userData) => {
    console.log("Registering user");

    console.log("userData", userData);

    try {
        const response = await axios.post(`${BASE_URL}/authentication/register`, userData);
        return response.data;
    }
    catch (err) {
        console.log("Error during registration: " + err.message);
        throw err;
    }
}

export const updateUserPassword = async (id, password) => {
    console.log("Updating user password with id " + id);

    try {
        const response = await axios.put(`${BASE_URL}/users/password`, { id, password });
        return response.data;
    }
    catch (err) {
        console.log("Error updating user password: " + err.message);
    }
}

// ********** ADDRESSES **********

export const fetchAddresses = async () => {
    console.log("Fetching addresses");

    try {
        const response = await axios.get(`${BASE_URL}/addresses`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching addresses: " + err.message);
    }
}

export const fetchAddress = async (id) => {
    console.log("Fetching address with id " + id);

    try {
        const response = await axios.get(`${BASE_URL}/addresses/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching address: " + err.message);
    }
}

// ********** PRODUCTS *********

export const fetchProducts = async () => {
    console.log("Fetching products");

    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching products: " + err.message);
    }
}

export const fetchProductsByCategory = async (category) => {
    console.log("Fetching products with category " + category);

    try {
        const response = await axios.get(`${BASE_URL}/products/category/${category}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching products: " + err.message);
    }
}

export const fetchProduct = async (id) => {
    console.log("Fetching product with id " + id);

    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching product: " + err.message);
    }
}

export const addProduct = async (product) => {
    console.log("Adding product");

    if(product.price === "")
        product.price = 0;

    try {
        const response = await axios.post(`${BASE_URL}/products`, product);
        return response.data;
    }
    catch (err) {
        console.log("Error adding product: " + err.message);
    }
}

export const updateProduct = async (id, product, deletedImages) => {
    console.log("Updating product with id " + id);

    try {
        const response = await axios.put(`${BASE_URL}/products/${id}`, product);
        return response.data;
    }
    catch (err) {
        console.log("Error updating product: " + err.message);
    }
}

export const deleteImages = async (deletedImages) => {
    console.log("Removing images from product");
    console.log("deletedImages: ", deletedImages);
    
    try {
        const response = await axios.post(`${BASE_URL}/assets/delete`, { files: deletedImages });
        return response.data;
    }
    catch (err) {
        console.log("Error removing product images: " + err.message);
    }
}

export const deleteProduct = async (id) => {
    console.log("Deleting product with id " + id);

    try {
        const response = await axios.delete(`${BASE_URL}/products/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error deleting product: " + err.message);
    }
}

// ********** SCHEDULINGS **********

export const fetchSchedulings = async () => {
    console.log("Fetching schedulings");

    try {
        const response = await axios.get(`${BASE_URL}/schedulings`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching schedulings: " + err.message);
    }
}

export const fetchScheduling = async (id) => {
    console.log("Fetching scheduling with id " + id);

    try {
        const response = await axios.get(`${BASE_URL}/schedulings/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching scheduling: " + err.message);
    }
}

export const fetchSchedulingsByUser = async (userId) => {
    console.log("Fetching schedulings with user id " + userId);

    try {
        const response = await axios.get(`${BASE_URL}/schedulings/user/${userId}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching schedulings: " + err.message);
    }
}

export const addScheduling = async (scheduling) => {
    console.log("Adding scheduling");

    try {
        const response = await axios.post(`${BASE_URL}/schedulings`, scheduling);
        return response.data;
    }
    catch (err) {
        console.log("Error adding scheduling: " + err.message);
    }
}

export const updateScheduling = async (scheduling) => {
    console.log("Updating scheduling with id " + scheduling.id);
    console.log("scheduling", scheduling);

    try {
        const response = await axios.put(`${BASE_URL}/schedulings/`, scheduling);
        return response.data;
    }
    catch (err) {
        console.log("Error updating scheduling: " + err.message);
    }
}

export const deleteScheduling = async (id) => {
    console.log("Deleting scheduling with id " + id);

    try {
        const response = await axios.delete(`${BASE_URL}/schedulings/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error deleting scheduling: " + err.message);
    }
}

export const cancelScheduling = async (id) => {
    console.log("Canceling scheduling with id " + id);

    try {
        const response = await axios.put(`${BASE_URL}/schedulings/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error canceling scheduling: " + err.message);
    }
}

// ********** ADDRESSES **********

export const addAddress = async (address) => {
    console.log("Adding address");

    try {
        const response = await axios.post(`${BASE_URL}/addresses`, address);
        return response.data;
    }
    catch (err) {
        console.log("Error adding address: " + err.message);
    }
}

export const updateAddress = async (address) => {
    console.log("Updating address");

    try {
        const response = await axios.put(`${BASE_URL}/addresses/`, address);
        return response.data;
    }
    catch (err) {
        console.log("Error updating address: " + err.message);
    }
}

// **************** ASSETS ****************

export const fetchAsset = async (id) => {
    console.log("Fetching asset with id: " + id);

    try {
        const response = await axios.get(`${BASE_URL}/assets/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error fetching asset: " + err.message);
    }
}

export const uploadPhotos = async (photos) => {
    console.log("Uploading photos");
    console.log("photos: ", photos);
    let formData = new FormData();
    photos.forEach(photo => {
        const filename = photo.split('/').pop();
        console.log("filename: ", filename);
        console.log("type: ", mime.getType(filename))
        const newImageUri = "file:///" + photo.split("file:/").join("");

        formData.append('images', {
            uri: Platform.select({ ios: photo.replace('file://', ''), android: newImageUri }),
            name: filename,
            type: mime.getType(filename)
        });
    });
    console.log("formData: ", formData);

    try {
        const response = await axios.post(`${BASE_URL}/assets`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        return response.data;
    } catch (err) {
        console.log("Error uploading photo: " + err.message);
    }
}

*/