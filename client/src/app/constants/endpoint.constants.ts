import { URLJoin } from '../utils/http.utils';

export const BASE_URL = 'http://127.0.0.1:8000';

/* USERS
 */
export const USERS                      = 'users';
export const USERS_SIGNUP               = URLJoin(USERS, 'create');
export const USERS_LOGIN                = URLJoin(USERS, 'login');
export const USERS_PASS_RESET           = URLJoin(USERS, 'password_reset');
export const USERS_PASS_RESET_CONFIRM   = URLJoin(USERS, 'reset/:uid/:token');

/* BOARDS
 */
export const BOARDS         = 'boards';
export const BOARDS_CREATE  = URLJoin(BOARDS, 'create');
