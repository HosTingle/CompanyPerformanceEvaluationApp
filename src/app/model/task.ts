export class Task {
    constructor(
      public id: number,
      public text: string,
      public completed: boolean = false
    ) {}
  }