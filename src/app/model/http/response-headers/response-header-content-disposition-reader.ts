export class ResponseHeaderContentDispositionReader {
  static getFilenameFromResponse(resp, defaultFilename: string): string {
    try {
      return resp.headers.get('content-disposition')
        .split(';')[1]
        .split('filename')[1]
        .split('=')[1]
        .trim();
    } catch (error) {
      return defaultFilename;
    }
  }
}
