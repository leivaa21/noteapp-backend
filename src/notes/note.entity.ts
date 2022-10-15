class Note {
  constructor(
    public readonly id: string,
    private _title: string,
    private _content: string,
  ) {}

  get title() {
    return this._title;
  }
  get content() {
    return this._content;
  }

  get json() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

export default Note;
