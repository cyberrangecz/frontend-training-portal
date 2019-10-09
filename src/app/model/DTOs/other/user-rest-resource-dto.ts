import {UserDTO} from 'kypo2-auth';
import {Paginated} from './paginated';

export interface UserRestResource {
  /**
   * Retrieved Training Definitions from databases.
   */
  content?: Array<UserDTO>;
  /**
   * Paginated including: page number, number of elements in page, size, total elements and total pages.
   */
  pagination?: Paginated;
}
