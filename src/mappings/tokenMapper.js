import Token from '../core/token';

export default class TokenMapper {
    /**
     * Convert received Json to new User type
     *
     * @param { object } json
     * @returns { new Token }
     */
    static convertToToken(json) {
        return new Token(json.body.token);
    }
}
