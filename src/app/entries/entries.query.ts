import { Query } from "../shared/models/query.model";

export class EntriesQuery {
  public static getQuery(): Query {
    return {
      query: `{
        queryEntriesContents {
          flatData {
            description
            category {
              ... on Categories {
                id
                flatData {
                  name
                }
              }
            }
            date
            value
          }
        }
      }
      `,
    };
  }
}
