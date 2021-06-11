export class Posting {
  constructor(
    public  postingId: string,
    public  userId: string | undefined,
    public  content: string,
    public  emotion: string,
    public  creationDate: string,
  ) {

  }
}
