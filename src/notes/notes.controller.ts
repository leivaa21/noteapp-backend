import { Controller, Get, Request, Response } from '@nestjs/common';
import { Request as request, Response as response } from 'express';
import { NotesService } from './notes.service';

@Controller('/api/notes')
class NotesController {
  constructor(private readonly service: NotesService) {}

  @Get('/')
  getNotes(@Request() req: request, @Response() res: response) {
    const notes = this.service.getNotes();
    res.status(200).json({ notes: notes.map((note) => note.json) });
  }
}

export { NotesController };
