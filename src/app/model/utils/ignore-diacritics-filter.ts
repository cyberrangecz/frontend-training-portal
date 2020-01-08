/**
 * Removes diacritics from string
 * @deprecated
 */
export class StringNormalizer {

 static normalizeDiacritics(str: string): string {
   return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}

