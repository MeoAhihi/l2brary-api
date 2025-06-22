export class QueryClassDto {
  name?: string;
  day?: string;
  frequency?: string;
  time_range?: {
    start_time: string;
    end_time: string;
  };
}
