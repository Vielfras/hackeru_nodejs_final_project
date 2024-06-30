// errorHandling.js

const notLoggedIn = () => {
    return { sucees: false, message: 'Forbidden: Must be logged-in to view this content.' };
}

const userNotFound = (searchedId) => {
    return res.status(404).json({ 
        success: false, 
        message: `User id '${searchedId}' not found.`,
    });
};

const multipleErrToString = (error) => {
    const errorsArray = error.details.map((err) => err.message);
    return { success: false, message: errorsArray };
};


module.exports = {
    notLoggedIn,
    userNotFound, 
    multipleErrToString,
};
