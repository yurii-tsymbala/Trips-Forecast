export class Weather {
    constructor(
      public datetimeEpoch: number,
      public tempmax: number,
      public tempmin: number,
      public temp: number,
      public address: string,
      public icon: string
    ) {}
  }