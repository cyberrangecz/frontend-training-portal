/**
 * Event of the form change in free form component
 */
export interface FreeFormItemsChangeEvent {
  items?: string[];
  index?: number;
  isDeleted?: boolean;
  isAdded?: boolean;
  cleared?: boolean;
  validity: boolean;
}
