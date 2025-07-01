// import Airtable from 'airtable';

// // Type definitions
// export interface IAirtableRecord<T = Record<string, unknown>> {
//   id: string;
//   fields: T;
//   createdTime?: string;
// }

// export interface IListParams {
//   maxRecords?: number;
//   pageSize?: number;
//   view?: string;
//   filterByFormula?: string;
//   sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
// }

// export class AirtableService {
//   private base: Airtable.Base;

//   constructor(apiKey: string, baseId: string, endpointUrl?: string) {
//     this.base = new Airtable({
//       apiKey,
//       endpointUrl: endpointUrl || 'https://api.airtable.com'
//     }).base(baseId);
//   }

//   private handleError(error: unknown): never {
//     if (error instanceof Error) {
//       console.error('Airtable Error:', error.message);
//       throw new Error(`Airtable operation failed: ${error.message}`);
//     }
//     throw new Error('Unknown Airtable error occurred');
//   }

//   /**
//    * List records from a table
//    * @param tableName Name of the table
//    * @param params Query parameters
//    */
//   public async list<T>(tableName: string, params?: IListParams): Promise<IAirtableRecord<T>[]> {
//     try {
//       const records = await this.base(tableName)
//         .select({
//           maxRecords: params?.maxRecords,
//           view: params?.view,
//           filterByFormula: params?.filterByFormula,
//           sort: params?.sort,
//         })
//         .all();
//       return records as unknown as IAirtableRecord<T>[];
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }

//   /**
//    * Create a new record
//    * @param tableName Name of the table
//    * @param fields Data to create
//    */
//   public async create<T>(tableName: string, fields: T): Promise<IAirtableRecord<T>> {
//     try {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const record = await this.base(tableName).create(fields as any);
//       return record as unknown as IAirtableRecord<T>;
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }

//   /**
//    * Update an existing record
//    * @param tableName Name of the table
//    * @param recordId ID of the record to update
//    * @param fields Data to update
//    */
//   public async update<T>(tableName: string, recordId: string, fields: Partial<T>): Promise<IAirtableRecord<T>> {
//     try {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const record = await this.base(tableName).update(recordId, { fields } as any);
//       return record as unknown as IAirtableRecord<T>;
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }

//   /**
//    * Delete a record
//    * @param tableName Name of the table
//    * @param recordId ID of the record to delete
//    */
//   public async delete(tableName: string, recordId: string): Promise<boolean> {
//     try {
//       await this.base(tableName).destroy(recordId);
//       return true;
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }

//   /**
//    * Find a record by ID
//    * @param tableName Name of the table
//    * @param recordId ID of the record to find
//    */
//   public async find<T>(tableName: string, recordId: string): Promise<IAirtableRecord<T>> {
//     try {
//       const record = await this.base(tableName).find(recordId);
//       return record as unknown as IAirtableRecord<T>;
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }
// }

// // Factory function to create the service instance
// export const createAirtableService = () => {
//   return new AirtableService(
//     import.meta.env.VITE_API_KEY,
//     import.meta.env.VITE_BASE_ID,
//     import.meta.env.VITE_ENDPOINT_URL
//   );
// };

// // Default exported instance
// const airtableService = createAirtableService();
// export default airtableService;
