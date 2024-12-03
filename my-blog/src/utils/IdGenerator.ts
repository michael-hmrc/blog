
class IdGenerator {

    // Utility function to generate user ID
    generateUserId = () => {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 10000);
        return `user-${timestamp}${randomNumber}`;
    };

};


export default new IdGenerator();