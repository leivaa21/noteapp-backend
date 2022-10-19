import {
  Controller,
  Delete,
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
  @ApiOperation({
    summary: 'Get all the notes',
  })
  getNotes(@Request() req: request, @Response() res: response) {
    const notes = this.service.getNotes();
    res.status(200).json({ notes: notes.map((note) => note.json) });
  }
  @Get('/:id')
  @ApiOperation({
    summary: 'Get a certain note',
  })
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
  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletes a note with a certain id',
  })
  deleteOneNote(
    @Param('id') id: string,
    @Request() req: request,
    @Response() res: response,
  ) {
    this.service.deleteNoteByID(id);
    res.status(200).json({ message: 'Note was deleted' });
  }
}

export { NotesController };
