import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Request as request, Response as response } from 'express';
import { NotesService } from './notes.service';

class CreateNoteDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
@ApiTags('Notes')
@Controller('/api/notes')
class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create a new note given all the params',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateNoteDTO,
  })
  createNewNote(@Request() req: request, @Response() res: response) {
    const { title, content } = req.body;
    if (title === undefined || content === undefined) {
      throw new Error('Missing Parameters');
    }
    this.service.createNote(title, content);
    res.status(201).json({ message: 'ok!' });
  }
  @Get('/')
  getNotes(@Request() req: request, @Response() res: response) {
    const notes = this.service.getNotes();
    res.status(200).json({ notes: notes.map((note) => note.json) });
  }
  @Get('/:id')
  getOneNote(
    @Param('id') id: string,
    @Request() req: request,
    @Response() res: response,
  ) {
    const note = this.service.getNoteByID(id);
    if (note === undefined) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.status(200).json({ note: note.json });
  }
}

export { NotesController };
