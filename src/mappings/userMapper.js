import User from '../core/User';

export default class UserMapper {
    /**
     * Convert received Json to new User type
     *
     * @param { object } json
     * @returns { new User }
     */
    static convertToUser(json) {
        return new User(json.body.firstName, json.body.lastName);
    }
}
