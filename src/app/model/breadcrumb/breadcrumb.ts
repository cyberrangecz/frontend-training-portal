/**
 * Class representing a breadcrumb in a breadcrumb navigation system
 */
export class Breadcrumb {
  label: string;
  url: string;

  constructor(label: string, url: string) {
    this.label = label;
    this.url = url;
  }
}
