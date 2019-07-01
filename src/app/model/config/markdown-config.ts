import {MarkdownModuleConfig, MarkedOptions} from "ngx-markdown";
import {HttpClient} from "@angular/common/http";

export const MarkdownConfig: MarkdownModuleConfig = {
  loader: HttpClient,
    markedOptions: {
  provide: MarkedOptions,
    useValue: {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    },
  }
};
