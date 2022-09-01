import { Query } from "../shared/models/query.model";

export class CategoriesQuery {
  public static getQuery(): Query {
    return {
      query: `{
        queryCategoriesContents {
          id
          flatData {
            name
          }
        }
      }
      `,
    };
  }
}
