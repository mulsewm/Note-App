import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Note } from './note.model';

@Controller('notes')
export class NotesController {
  private notes: Note[] = [];

  @Get()
  getAllNotes(): Note[] {
    return this.notes;
  }

  @Get(':id')
  getNoteById(@Param('id') id: string): Note {
    return this.notes.find(note => note.id === +id);
  }

  @Post()
  createNote(@Body() note: Note): Note {
    note.id = this.notes.length + 1;
    this.notes.push(note);
    return note;
  }

  @Put(':id')
  updateNote(@Param('id') id: string, @Body() updatedNote: Note): Note {
    const index = this.notes.findIndex(note => note.id === +id);
    if (index !== -1) {
      this.notes[index] = { ...this.notes[index], ...updatedNote };
      return this.notes[index];
    }
    return null;
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string): Note {
    const index = this.notes.findIndex(note => note.id === +id);
    if (index !== -1) {
      const deletedNote = this.notes[index];
      this.notes.splice(index, 1);
      return deletedNote;
    }
    return null;
  }
}
